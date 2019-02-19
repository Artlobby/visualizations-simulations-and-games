# Toothpick Sequence

In geometry, the toothpick sequence is a sequence of 2-dimensional patterns which can be formed by repeatedly adding line segments ("toothpicks") to the previous pattern in the sequence.

The first stage of the design is a single "toothpick", or line segment. Each stage after the first is formed by taking the previous design and, for every exposed toothpick end, placing another toothpick centered at a right angle on that end.

This process results in a pattern of growth in which the number of segments at stage n oscillates with a fractal pattern between `0.45n2` and `0.67n2`. If `T(n)` denotes the number of segments at stage `n`, then values of n for which `T(n)/n2` is near its maximum occur when `n` is near a power of two, while the values for which it is near its minimum occur near numbers that are approximately `1.43 times a power of two`. The structure of stages in the toothpick sequence often resemble the T-square fractal, or the arrangement of cells in the Ulam–Warburton cellular automaton.

All of the bounded regions surrounded by toothpicks in the pattern, but not themselves crossed by toothpicks, must be squares or rectangles. It has been conjectured that every open rectangle in the toothpick pattern (that is, a rectangle that is completely surrounded by toothpicks, but has no toothpick crossing its interior) has side lengths and areas that are powers of two, with one of the side lengths being at most two.

## Build

```
npm install && npm run build
```

Open the `index.html` in your browser.