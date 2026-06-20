import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  useWindowDimensions,
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
// Ignore pointer moves shorter than this (px): fewer points means fewer
// re-renders on long strokes, and the curve smoothing hides the coarser sampling.
const MIN_STEP = 2;
// Cap the canvas at half the screen so a draw step (title + canvas + buttons)
// fits the viewport without forcing a scroll mid-drawing.
const MAX_CANVAS_FRACTION = 0.5;

/**
 * Build an SVG path from sampled points, smoothing the line with quadratic
 * curves through the midpoints of successive points (each raw point is the
 * control handle). One point renders as a round dot; two as a straight segment.
 */
function buildPath(pts: { x: number; y: number }[]): string {
  if (pts.length === 0) return '';
  const p0 = pts[0];
  if (pts.length === 1) return `M ${p0.x} ${p0.y} L ${p0.x} ${p0.y}`;
  let d = `M ${p0.x} ${p0.y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = round((pts[i].x + pts[i + 1].x) / 2);
    const my = round((pts[i].y + pts[i + 1].y) / 2);
    d += ` Q ${pts[i].x} ${pts[i].y} ${mx} ${my}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}

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
  onStrokeActiveChange,
}: {
  initial?: SketchData | null;
  onChange: (data: SketchData) => void;
  /** Fired true on touch-down and false on stroke end, so a parent can lock its
   *  scroll view while a stroke is in progress (keeps ink locked to the finger). */
  onStrokeActiveChange?: (active: boolean) => void;
}) {
  const { colors } = useTheme();
  const styles = useThemedStyles(makeStyles);
  const { height: screenH } = useWindowDimensions();
  const maxCanvas = Math.round(screenH * MAX_CANVAS_FRACTION);
  const [paths, setPaths] = useState<string[]>(initial?.paths ?? []);
  const [current, setCurrent] = useState('');
  const [size, setSize] = useState({ w: 0, h: 0 });

  const pathsRef = useRef<string[]>(initial?.paths ?? []);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const sizeRef = useRef({ w: initial?.w ?? 0, h: initial?.h ?? 0 });
  const onChangeRef = useRef(onChange);
  const onStrokeActiveRef = useRef(onStrokeActiveChange);
  useEffect(() => {
    onChangeRef.current = onChange;
    onStrokeActiveRef.current = onStrokeActiveChange;
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
    // Commit the in-progress stroke. buildPath turns a bare tap into a round dot,
    // so a quick mark still registers and counts toward `hasDrawing`.
    const commitStroke = () => {
      const pts = pointsRef.current;
      if (pts.length) {
        const d = buildPath(pts);
        pathsRef.current = [...pathsRef.current, d];
        setPaths(pathsRef.current);
        const s = sizeRef.current;
        onChangeRef.current({ w: s.w || 1, h: s.h || 1, paths: pathsRef.current });
      }
      pointsRef.current = [];
      setCurrent('');
      // Release the parent scroll lock once the stroke is committed.
      onStrokeActiveRef.current?.(false);
    };
    // eslint-disable-next-line react-hooks/refs -- handlers read refs only at gesture time, never during render
    return PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        // Claim the gesture in the capture phase — from the very first contact,
        // not just on move — and refuse to yield it mid-stroke. Without this, RN
        // defaults to surrendering the responder, letting the surrounding
        // KeyboardAwareScrollView steal the drag and scroll the page.
        onStartShouldSetPanResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderTerminationRequest: () => false,
        onShouldBlockNativeResponder: () => true,
        onPanResponderGrant: (e: GestureResponderEvent) => {
          // Lock the parent scroll for the duration of the stroke.
          onStrokeActiveRef.current?.(true);
          const { locationX, locationY } = e.nativeEvent;
          pointsRef.current = [{ x: round(locationX), y: round(locationY) }];
          setCurrent(buildPath(pointsRef.current));
        },
        onPanResponderMove: (e: GestureResponderEvent) => {
          const { locationX, locationY } = e.nativeEvent;
          const pts = pointsRef.current;
          const last = pts[pts.length - 1];
          // Drop sub-MIN_STEP moves to cut point count (and re-renders) on long strokes.
          if (last) {
            const dx = locationX - last.x;
            const dy = locationY - last.y;
            if (dx * dx + dy * dy < MIN_STEP * MIN_STEP) return;
          }
          pts.push({ x: round(locationX), y: round(locationY) });
          setCurrent(buildPath(pts));
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
      <View style={[styles.canvas, { maxHeight: maxCanvas }]} onLayout={onLayout} {...pan.panHandlers}>
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
