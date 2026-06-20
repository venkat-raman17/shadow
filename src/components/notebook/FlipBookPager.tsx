import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { FlatList, type NativeSyntheticEvent, type NativeScrollEvent } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolation,
  type SharedValue,
} from 'react-native-reanimated';

export interface FlipBookPagerHandle {
  /** Animate to a page by index (used by the dot indicator). */
  scrollToPage: (index: number) => void;
}

interface FlipBookPagerProps {
  /** One node per page; page 0 is the leftmost. */
  pages: React.ReactNode[];
  /** Fixed page width — passed in synchronously so paging never waits on layout. */
  pageWidth: number;
  /**
   * Explicit pager height measured by the parent via onLayout. When > 0, each page
   * and the FlatList itself get a hard height so ScrollViews inside are bounded on
   * all platforms (web's FlatList doesn't propagate height to items via flex).
   */
  pageHeight: number;
  /** OS reduce-motion preference; when true we skip the page-turn transforms. */
  reduced: boolean;
  /** Fired (on the JS thread) once a flip settles, with the new page index. */
  onPageChange?: (index: number) => void;
}

/**
 * A single page that "turns": as the book scrolls, the page eases through a
 * slight scale, dim, and perspective tilt around the binding so flipping feels
 * like paper rather than a hard snap. All driven off one shared scroll value on
 * the UI thread; honours reduce-motion by rendering flat.
 */
function FlipPage({
  index,
  pageWidth,
  pageHeight,
  scrollX,
  reduced,
  children,
}: {
  index: number;
  pageWidth: number;
  pageHeight: number;
  scrollX: SharedValue<number>;
  reduced: boolean;
  children: React.ReactNode;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    if (reduced) return {};
    const input = [(index - 1) * pageWidth, index * pageWidth, (index + 1) * pageWidth];
    const scale = interpolate(scrollX.value, input, [0.92, 1, 0.92], Extrapolation.CLAMP);
    const rotateY = interpolate(scrollX.value, input, [8, 0, -8], Extrapolation.CLAMP);
    const opacity = interpolate(scrollX.value, input, [0.5, 1, 0.5], Extrapolation.CLAMP);
    return {
      opacity,
      transform: [{ perspective: 900 }, { scale }, { rotateY: `${rotateY}deg` }],
    };
  });

  // Use explicit height so inner ScrollViews are bounded on all platforms.
  // Fall back to alignSelf:'stretch' before the parent has measured itself.
  const sizeStyle = pageHeight > 0
    ? { width: pageWidth, height: pageHeight }
    : { width: pageWidth, alignSelf: 'stretch' as const };

  return (
    <Animated.View style={[sizeStyle, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

export const FlipBookPager = forwardRef<FlipBookPagerHandle, FlipBookPagerProps>(
  function FlipBookPager({ pages, pageWidth, pageHeight, reduced, onPageChange }, ref) {
    const listRef = useRef<FlatList<React.ReactNode>>(null);
    const scrollX = useSharedValue(0);

    useImperativeHandle(
      ref,
      () => ({
        scrollToPage: (index: number) =>
          listRef.current?.scrollToOffset({ offset: index * pageWidth, animated: true }),
      }),
      [pageWidth],
    );

    // Drives the per-page turn animation on the UI thread.
    const scrollHandler = useAnimatedScrollHandler({
      onScroll: (e) => {
        scrollX.value = e.contentOffset.x;
      },
    });

    // Plain JS callback — resolves page index after scroll settles.
    // Attached to both events:
    //   onMomentumScrollEnd — fires on native after the snap animation
    //   onScrollEndDrag     — fires on web (CSS snap, no JS momentum phase)
    const handleScrollEnd = useCallback(
      (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        onPageChange?.(Math.round(e.nativeEvent.contentOffset.x / pageWidth));
      },
      [onPageChange, pageWidth],
    );

    // Use explicit height once the parent has measured itself; flex:1 covers the
    // first render before onLayout fires.
    const listStyle = pageHeight > 0 ? { height: pageHeight } : { flex: 1 };

    return (
      <Animated.FlatList
        ref={listRef}
        data={pages}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        style={listStyle}
        onScroll={scrollHandler}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
        scrollEventThrottle={16}
        keyExtractor={(_, i) => String(i)}
        getItemLayout={(_, index) => ({ length: pageWidth, offset: pageWidth * index, index })}
        renderItem={({ item, index }) => (
          <FlipPage
            index={index}
            pageWidth={pageWidth}
            pageHeight={pageHeight}
            scrollX={scrollX}
            reduced={reduced}>
            {item}
          </FlipPage>
        )}
      />
    );
  },
);
