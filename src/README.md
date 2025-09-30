# Badminton Court Lines

This is a clean-room implementation that defines the badminton court lines and service courts.

This mitigate core problem with AI generated code:
* instruction following:
  * claude required many prompts to correct and refine the court layout
* hallucination:
  * claude, copilot, and deepseek initially rendered courts that were incorrect

When consuming the data:
* x and y can be scaled independently for the device
* for modern displays, assume the PPI is the same both vertically and horizontally (i.e., square pixels);
  you only need to scale for the display resolution
* x and y represent lines, so if your scale is 1:1, x and y are the lines between pixels;
  in other words, rendering a line that spans from (0, y) to (3, y) would only have pixels at (0, y), (1, y), and (2, y)
* similar to the real life run-off area (which acts as a safety perimeter) around the badminton court,
  add a negative space around the rendered court
* to mimic PVC court mats, consider white lines on background colors such as:
  * green #48a14c
  * blue #000080
  * red #cd3435
* the net "line" represents the net; there is no line on the court surface, so consider rendering with a different
  thickness, colur, and/or pattern (e.g., dashed vs solid) and make it non-interactable

Files:
* badminton-court.php - PHP source that generates the JSON definition for badminton court lines and service areas
* badminton-court.json
* badminton-court.js - JavaScript (annotated JSON)
