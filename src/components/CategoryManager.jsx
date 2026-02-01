import { useState } from 'react'

function CategoryManager({ categories, onAdd, onDelete, onClose }) {
  const [newCategoryName, setNewCategoryName] = useState('')

  const handleAdd = () => {
    const trimmedName = newCategoryName.trim()
    if (!trimmedName) {
      alert('카테고리 이름을 입력해주세요.')
      return
    }
    if (categories.some(c => c.name === trimmedName)) {
      alert('이미 존재하는 카테고리입니다.')
      return
    }
    onAdd(trimmedName)
    setNewCategoryName('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl max-h-[80vh] flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">카테고리 관리</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 새 카테고리 추가 */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="새 카테고리 이름"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              추가
            </button>
          </div>
        </div>

        {/* 카테고리 목록 */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {categories.map(category => (
              <div
                key={category.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{category.name}</span>
                  {category.isDefault && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
                      기본
                    </span>
                  )}
                </div>
                {!category.isDefault && (
                  <button
                    onClick={() => {
                      if (confirm(`"${category.name}" 카테고리를 삭제하시겠습니까?`)) {
                        onDelete(category.id)
                      }
                    }}
                    className="text-red-500 hover:bg-red-100 p-2 rounded transition-colors"
                  >
                    🗑️
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 닫기 버튼 */}
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoryManager
