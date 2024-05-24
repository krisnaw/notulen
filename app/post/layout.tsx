export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  )
}