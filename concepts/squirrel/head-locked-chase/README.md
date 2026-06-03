# Squirrel: Head-Locked Chase

8-frame pixel-art running squirrel animation based on the supplied squirrel reference.

- Native frame size: `67 x 36`
- Frame count: `8`
- Uses one shared scale from the largest source pose to keep size consistent
- Sequence starts from the second supplied pose, then third, first, and fourth pose pairs
- Subtle horizontal camera-chase offset adds running momentum
- Pixel-art scaling only; 6x preview uses nearest-neighbor scaling

## Files

- `frames/frame_01.png` through `frames/frame_08.png`: native PNG frames
- `previews/run.gif`: native preview GIF
- `previews/run_preview_6x.gif`: enlarged nearest-neighbor preview
- `docs/contact_sheet.png`: contact sheet
- `docs/head_check.png`: enlarged face/upper-body check
