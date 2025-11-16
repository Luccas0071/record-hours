export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <div className="min-h-svh bg-gradient-to-br from-slate-50 to-slate-100">
      {children}
    </div>
  );
}