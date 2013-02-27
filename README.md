## GLMatrix Shims!

I have a big app. It needs to migrate from GLM v1.x to GLM v2.x. After
multiple attempts, I've decided that doing it all in one go is not the best
way. Instead, I need SHIMS!

This package wraps the GLM v2.x libraries in a container object called
`GLMatrix`. Then it replaces `vec2`, `vec3`, `vec4`, `mat2`, `mat3`, `mat4`, 
and `quat4` in the global namespace with SHIMMED versions. The shimmed 
versions wrap around their GLM v2.x counterparts, so that their signatures 
match GLM v1.x but they're actually running against v2.x.

This will let me drop in the shim, make sure everything works (and discover
any issues within GLMatrix proper if it doesn't!), and then start upgrading
my code one line at a time by replacing it with calls into the versions
exposed in the `GLMatrix` namespace.

When I'm all done, I can do a simple find-and-replace on `GLMatrix.` to remove references to that namespace; back out the shim; and watch all of my tests pass in brilliant neon green-ness!

That's the plan, anyway.


### Reassurances

How will I know the shims actually work, rather than making life more complicated? Easy. I'll pull all of the GL-Matrix v1.x unit tests into this shimming library. Then I'll use them to test the shims. If any GL-Matrix v1.x unit tests fail, then the shim's not doing its job. If any tests are missing, I'll code them here. Every single shim will be covered by one or more tests.


### Example

In nearly every API, methods were changed to require an output object, and the order of the arguments were changed as well. So, for every reference to `vec3.add(a, b, out)`, you now need to replace that with `vec3.add(out, a, b)`; and for every reference to `vec3.add(a, b)`, you now need to replace that with `vec3.add(a, a, b)`. What a nightmare!

Slide the shim into place and it gets easier. Suddenly, `vec3.add(a, b)` works just like it did in v1.x!

The next step is to figure out where all your references to `vec3.add` are. A project-wide search or command-line grep will get you that, but that's an excellent way to get the arguments reversed, leading to unwanted and hard-to-track bugs! There is a better way!

Instead, you can just turn on shim logging like so:

    GLMatrix.noisy = true;
    GLMatrix.stack = true;

Now, every call to a shimmed function will log a warning and a stack trace to the console, letting you track the calls down very quickly indeed!

So, let's say you've found a call to a shimmed function. Just replace it like so:

    vec3.add(a, b);             // old, noisy, grumpy version :(
    GLMatrix.vec3.add(a, a, b); // new, quiet, happy version!

When the console has gone silent, you're done upgrading. The last step is to back out the shim and remove `GLMatrix.noisy = true;`. **This will also remove the `GLMatrix` namespace, breaking your code.** But that's expected. At this point, since all your arguments are in order, it should be safe to just do a project-wide find-and-replace to remove any reference to `GLMatrix.` and call the GLMatrix methods in the wild, just as nature intended!


### And then remember to uninstall this package.

Remember, GLMatrix is a **performance** library. You could conceivably leave this shim in place for all eternity, but it's going to impact your application's **performance**. The shims are a development tool, _not_ a production library, and they were written with my own ease-of-coding in mind -- NOT your application's **performance**. You have been warned.
