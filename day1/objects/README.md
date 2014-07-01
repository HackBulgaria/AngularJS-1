# Object hierarchy

Extend the "abstract class" `Filter` by creating:

1. Object using the object literal syntax.
2. Object using the module pattern. Implement the method `applyFilter` as private and export it in the public interface.
3. Constructor function.

Make sure you call the base constructor function with the appropriate context in order to pass the `id` argument.

Predefine the method `applyFilter`. As arguments it accepts, the data, containing all pixels of the canvas and index - the position of the current pixel.
This means that `data[i]` will be the red value, `data[i + 1]` will be the green value, `data[i + 2]` will be the blue value and `data[i + 3]` will be the alpha value.

Set the red, green and blue values to be equal to the result of the expression `0.2126 * red + 0.7152 * green + 0.0722 * blue`.

You may need to make slight modification in the `app.js` file in order to add filter using the method `addFilter` of the `Video` instances.

