// Three.js r128 lightweight runtime shim for ThreeUI shader fields
/* eslint-disable @typescript-eslint/no-explicit-any */

export class WebGLRenderer {
  domElement: HTMLCanvasElement;
  autoClear = true;
  constructor(opts?: any) {
    this.domElement = opts?.canvas ?? (typeof document !== "undefined" ? document.createElement("canvas") : ({} as any));
  }
  setPixelRatio(..._args: any[]) {}
  setSize(..._args: any[]) {}
  setClearColor(..._args: any[]) {}
  setRenderTarget(..._args: any[]) {}
  render(..._args: any[]) {}
  dispose() {}
}

export class Scene {
  constructor(..._args: any[]) {}
  add(..._args: any[]) {}
  remove(..._args: any[]) {}
}

export class PerspectiveCamera {
  aspect = 1;
  fov = 50;
  position = new Vector3(0, 0, 5);
  constructor(..._args: any[]) {}
  updateProjectionMatrix() {}
}

export class OrthographicCamera {
  position = new Vector3(0, 0, 1);
  constructor(..._args: any[]) {}
  updateProjectionMatrix() {}
}

export class Group {
  position = new Vector3();
  rotation = new Vector3();
  constructor(..._args: any[]) {}
  add(..._args: any[]) {}
  remove(..._args: any[]) {}
}

export class SphereGeometry {
  constructor(..._args: any[]) {}
  dispose() {}
}

export class IcosahedronGeometry {
  constructor(..._args: any[]) {}
  dispose() {}
}

export class TorusGeometry {
  constructor(..._args: any[]) {}
  dispose() {}
}

export class PlaneGeometry {
  constructor(..._args: any[]) {}
  dispose() {}
}

export class BufferGeometry {
  constructor(..._args: any[]) {}
  setAttribute(..._args: any[]) {}
  dispose() {}
}

export class Float32BufferAttribute {
  constructor(..._args: any[]) {}
}

export class ShaderMaterial {
  uniforms: Record<string, { value: any }>;
  constructor(opts?: any) {
    this.uniforms = opts?.uniforms ?? {};
  }
  dispose() {}
}

export class Points {
  constructor(..._args: any[]) {}
}

export class Vector2 {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }
  copy(v: any) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }
  lerp(..._args: any[]) {
    return this;
  }
}

export class Vector3 {
  x: number;
  y: number;
  z: number;
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  set(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  copy(v: any) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }
  setScalar(s: number) {
    this.x = s;
    this.y = s;
    this.z = s;
    return this;
  }
}

export class Color {
  r: number;
  g: number;
  b: number;
  constructor(r = 1, g = 1, b = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

export class Mesh {
  geometry: any;
  material: any;
  visible = true;
  position = new Vector3();
  rotation = new Vector3();
  scale = new Vector3(1, 1, 1);
  constructor(g?: any, m?: any) {
    this.geometry = g;
    this.material = m;
  }
}

export class WebGLRenderTarget {
  texture = {};
  constructor(..._args: any[]) {}
  setSize(..._args: any[]) {}
  dispose() {}
}

export const RGBAFormat = 1023;
export const LinearFilter = 1006;

export class Matrix4 {
  constructor(..._args: any[]) {}
}
