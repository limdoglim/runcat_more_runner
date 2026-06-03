# Project Guidelines

## Asset Structure

- Put concepts under `concepts/<character>/<variant>/`.
- Use `frames/` for native PNG frames, `previews/` for GIF previews, and `docs/` for contact sheets or notes.
- Keep source experiments out of commits unless the user explicitly asks to include them.

## Pixel Runner Rules

- Preserve pixel-art precision: no blur, no blended tween frames, no antialiasing, and no soft interpolation.
- Use nearest-neighbor scaling for previews and contact sheets.
- Keep every frame in a variant the same canvas size.
- Keep character scale consistent across frames. Do not resize each pose independently.
- Lock head or eye height unless the user asks for vertical bounce.
- Use small horizontal camera-chase offsets for momentum. For right-facing runners, a push-off frame can move the character 1 px left while the camera looks forward.
- If adding more frames, make them real hard-pixel pose edits or camera offsets, not alpha/color blends.

## Reference-Based Variants

- When the user provides a reference image, treat it as the visual direction for silhouette, proportions, face, ears, tail, and palette.
- Do not recolor an unrelated sprite if the species identity changes too much. Rebuild the sprite while preserving the approved runner rules.
- For white dog concepts, prioritize a rounded snout, floppy ear, curled raised tail, black nose/eye, cream-white body, gray outline, and small tan/gray shadow pixels.
- Check contact sheets before final delivery and report exact frame size and frame count.
