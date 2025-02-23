import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware chamado para:", req.nextUrl.pathname);

  // Verifica se há um token de autenticação
  const token = req.cookies.get("token")?.value;

  // Verifica se há um token temporário (tempToken) para troca de senha
  const tempToken = req.cookies.get("tempToken")?.value;

  // Lógica de redirecionamento
  if (!token && !tempToken) {
    // Se não houver nenhum token, redireciona para a página de login
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Se houver tempToken, redireciona para a troca de senha
  if (tempToken && req.nextUrl.pathname !== "/changePassword") {
    return NextResponse.redirect(new URL("/changePassword", req.url));
  }

  // Se houver token, permite o acesso à rota
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/changePassword",
    "/contracts/:path*",
    "/dataUsers/:path*",
    "/financial/:path*"
  ],
};
