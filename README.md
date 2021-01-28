# Bézier Curve

Just a fun little project to learn how to render Bézier Curves.

## CPU implementation

![thumbnail-cpu](./thumbnail-cpu.png)

## GPU implementation

![thumbnail-gpu](./thumbnail-gpu.png)

## Screencasts

| Thumbnail | Link |
| --- | --- |
| [![thumbnail](http://i3.ytimg.com/vi/2oKzBq43ShE/default.jpg)](https://www.youtube.com/watch?v=2oKzBq43ShE&list=PLpM-Dvs8t0VY5sYK_mm1k9dZw5tFWgg4L) | [Coding Bézier Curves — Day 1](https://www.youtube.com/watch?v=2oKzBq43ShE&list=PLpM-Dvs8t0VY5sYK_mm1k9dZw5tFWgg4L) |
| [![thumbnail](http://i3.ytimg.com/vi/m4gVWZ_OkG4/default.jpg)](https://www.youtube.com/watch?v=m4gVWZ_OkG4&list=PLpM-Dvs8t0VY5sYK_mm1k9dZw5tFWgg4L) | [Bézier Curves using OpenGL Fragment Shader — Day 2](https://www.youtube.com/watch?v=m4gVWZ_OkG4&list=PLpM-Dvs8t0VY5sYK_mm1k9dZw5tFWgg4L) |

## Quick Start

```console
$ make
$ ./cpu.exe
$ ./gpu.exe
```

## Setup compiller environment in Windows 

Install latest [msys2_64](https://www.msys2.org/)

Run MSYS2 console : `msys2.exe`

In console install packages with pacman: `pacman -Sy git mingw-w64-i686-toolchain mingw32/mingw-w64-i686-SDL2 mingw32/mingw-w64-i686-SDL2_mixer mingw32/mingw-w64-i686-SDL2_image mingw32/mingw-w64-i686-SDL2_ttf mingw32/mingw-w64-i686-SDL2_net mingw32/mingw-w64-i686-cmake mingw32/mingw-w64-i686-libepoxy make`. (it's for 32 bit version installation)

Add to system `PATH` compiller directory name `C:\msys64\mingw32\bin`

Dublicate `mingw32-make.exe` into `make.exe` to get ability to run make with a classic command `make`.

## References

- https://www.geogebra.org/m/WPHQ9rUt
- https://gist.github.com/jordandee/94b187bcc51df9528a2f

## P.S.

This example is suitable only for the first understanding of shader routines. 
The example does not show the real possibilities of shaders. 
To get acquainted with the real capabilities of shaders, it is better to look at [raylib examples](https://github.com/raysan5/raylib/tree/master/examples/shaders).

