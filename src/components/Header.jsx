function Header({ onAddClick, onCategoryClick }) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🧊</span>
            <h1 className="text-xl md:text-2xl font-bold">냉장고 관리</h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onCategoryClick}
              className="px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm md:text-base flex items-center gap-1"
            >
              <span>📁</span>
              <span className="hidden sm:inline">카테고리</span>
            </button>
            <button
              onClick={onAddClick}
              className="px-4 py-2 bg-white text-indigo-600 hover:bg-indigo-50 rounded-lg font-semibold transition-colors text-sm md:text-base flex items-center gap-1"
            >
              <span>➕</span>
              <span>추가</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
