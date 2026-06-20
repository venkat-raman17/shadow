import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  type LayoutChangeEvent,
  type GestureResponderEvent,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Spacing, radii, type Theme } from '@/constants/theme';
import { useTheme, useThemedStyles } from '@/constants/theme-context';
import { Button } from '@/components/ui';

/** A vector drawing: paths are SVG `d` strings in a `w`×`h` coordinate space. */
export interface SketchData {
  w: number;
  h: number;
  paths: string[];
}

export function parseSketch(json: string | null | undefined): SketchData | null {
  if (!json) return null;
  try {
    const v = JSON.parse(json);
    if (v && Array.isArray(v.paths) && typeof v.w === 'number' && typeof v.h === 'number') {
      return { w: v.w, h: v.h, paths: v.paths.filter((p: unknown) => typeof p === 'string') };
    }
  } catch {
    // ignore corrupt value
  }
  return null;
}

const round = (n: number) => Math.round(n * 10) / 10;
const STROKE = 2.5;

/** Read-only render of a sketch, scaled into the given box via viewBox. */
export function SketchView({
  data,
  width,
  height,
}: {
  data: SketchData;
  width: number;
  height: number;
}) {
  const { colors } = useTheme();
  if (!data.paths.length) return null;
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${data.w} ${data.h}`}>
      {data.paths.map((d, i) => (
        <Path
          key={i}
          d={d}
          stroke={colors.textPrimary}
          strokeWidth={STROKE}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </Svg>
  );
}

/**
 * An editable drawing surface. Strokes are captured with core PanResponder (no
 * gesture-handler root needed) and rendered as SVG paths. Emits the full
 * { w, h, paths } via onChange whenever a stroke is committed, undone, or cleared.
 */
export function SketchCanvas({
  initial,
  onChange,
}: {
  initial?: SketchData | null;
  onChange: (data: SketchData) => void;
}) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const [paths, setPaths] = useState<string[]>(initial?.paths ?? []);
  const [current, setCurrent] = useState('');
  const [size, setSize] = useState({ w: 0, h: 0 });

  const pathsRef = useRef<string[]>(initial?.paths ?? []);
  const currentRef = useRef('');
  const sizeRef = useRef({ w: initial?.w ?? 0, h: initial?.h ?? 0 });
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  function emit(next: string[]) {
    const s = sizeRef.current;
    onChangeRef.current({ w: s.w || 1, h: s.h || 1, paths: next });
  }

  function onLayout(e: LayoutChangeEvent) {
    const { width, height } = e.nativeEvent.layout;
    sizeRef.current = { w: width, h: height };
    setSize({ w: width, h: height });
  }

  // Created once. Handlers only touch refs and stable setState setters, so the
  // empty dep list is intentional (and keeps strokes from resetting mid-draw).
  const pan = useMemo(() => {
    // Commit the in-progress stroke. A bare tap (only "M x y", no line) becomes a
    // round dot so a quick mark still registers and counts toward `hasDrawing`.
    const commitStroke = () => {
      let d = currentRef.current;
      if (d && !d.includes('L')) {
        d = `${d} L ${d.slice(2)}`;
      }
      if (d.includes('L')) {
        pathsRef.current = [...pathsRef.current, d];
        setPaths(pathsRef.current);
        const s = sizeRef.current;
        onChangeRef.current({ w: s.w || 1, h: s.h || 1, paths: pathsRef.current });
      }
      currentRef.current = '';
      setCurrent('');
    };
    // eslint-disable-next-line react-hooks/refs -- handlers read refs only at gesture time, never during render
    return PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        // Claim the gesture in the capture phase and refuse to yield it mid-stroke.
        // Without this, RN defaults to surrendering the responder, letting the
        // surrounding KeyboardAwareScrollView steal the drag and scroll the page.
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderTerminationRequest: () => false,
        onShouldBlockNativeResponder: () => true,
        onPanResponderGrant: (e: GestureResponderEvent) => {
          const { locationX, locationY } = e.nativeEvent;
          currentRef.current = `M ${round(locationX)} ${round(locationY)}`;
          setCurrent(currentRef.current);
        },
        onPanResponderMove: (e: GestureResponderEvent) => {
          const { locationX, locationY } = e.nativeEvent;
          currentRef.current += ` L ${round(locationX)} ${round(locationY)}`;
          setCurrent(currentRef.current);
        },
        onPanResponderRelease: commitStroke,
        // If the OS force-terminates the gesture (backgrounded, edge swipe), keep the stroke.
        onPanResponderTerminate: commitStroke,
      });
  }, []);

  function undo() {
    pathsRef.current = pathsRef.current.slice(0, -1);
    setPaths(pathsRef.current);
    emit(pathsRef.current);
  }

  function clear() {
    pathsRef.current = [];
    setPaths(pathsRef.current);
    emit(pathsRef.current);
  }

  const empty = paths.length === 0 && !current;

  return (
    <View style={styles.wrap}>
      <View style={styles.canvas} onLayout={onLayout} {...pan.panHandlers}>
        <Svg width={size.w} height={size.h}>
          {paths.map((d, i) => (
            <Path
              key={i}
              d={d}
              stroke={colors.textPrimary}
              strokeWidth={STROKE}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {current ? (
            <Path
              d={current}
              stroke={colors.textPrimary}
              strokeWidth={STROKE}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
        </Svg>
        {empty ? <Text style={styles.hint}>Draw what it looks like — no skill needed.</Text> : null}
      </View>

      <View style={styles.tools}>
        <Button label="Undo" variant="secondary" fullWidth={false} onPress={undo} style={styles.tool} />
        <Button label="Clear" variant="secondary" fullWidth={false} onPress={clear} style={styles.tool} />
      </View>
    </View>
  );
}

const makeStyles = ({ colors, typography }: Theme) =>
  StyleSheet.create({
  wrap: { gap: Spacing.two },
  canvas: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  hint: { position: 'absolute', ...typography.bodySmall, color: colors.textFaint },
  tools: { flexDirection: 'row', gap: Spacing.two },
  tool: { flex: 1, paddingVertical: Spacing.two },
});
