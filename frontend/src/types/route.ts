import { NextRequest, NextResponse } from 'next/server';
type ParamsType<T extends string> = T extends `${string}[${infer P}]${infer Rest}`
  ? { [K in P]: string } & ParamsType<Rest>
  : Record<string, never>;
export interface RouteHandlerContext<T extends string> {
  params: ParamsType<T>;
}
export type RouteHandler<T extends string> = (
  req: NextRequest,
  ctx: RouteHandlerContext<T>
) => Promise<NextResponse> | NextResponse;
export type RouteHandlerConfig<T extends string> = {
  GET?: RouteHandler<T>;
  POST?: RouteHandler<T>;
  PUT?: RouteHandler<T>;
  PATCH?: RouteHandler<T>;
  DELETE?: RouteHandler<T>;
  HEAD?: RouteHandler<T>;
  OPTIONS?: RouteHandler<T>;
};