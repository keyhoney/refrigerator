import { useState, useEffect } from 'react'

function ItemForm({ categories, currentStorage, editingItem, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    expiryDate: '',
    category: categories.length > 0 ? categories[0].name : '기타',
    storage: currentStorage,
    memo: ''
  })

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name || '',
        quantity: editingItem.quantity || '',
        expiryDate: editingItem.expiryDate || '',
        category: editingItem.category || (categories.length > 0 ? categories[0].name : '기타'),
        storage: editingItem.storage || currentStorage,
        memo: editingItem.memo || ''
      })
    }
  }, [editingItem, categories, currentStorage])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      alert('식재료 이름을 입력해주세요.')
      return
    }
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {editingItem ? '식재료 수정' : '식재료 추가'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 이름 (필수) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="예: 당근, 우유, 삼겹살"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                autoFocus
              />
            </div>

            {/* 저장 위치 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                저장 위치
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, storage: 'refrigerator' }))}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    formData.storage === 'refrigerator'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🥬 냉장
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, storage: 'freezer' }))}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    formData.storage === 'freezer'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🧊 냉동
                </button>
              </div>
            </div>

            {/* 카테고리 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                카테고리
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 수량 (선택) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                수량 <span className="text-gray-400 text-xs">(선택)</span>
              </label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="예: 3개, 500g, 1팩"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>

            {/* 소비기한 (선택) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                소비기한 <span className="text-gray-400 text-xs">(선택)</span>
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>

            {/* 메모 (선택) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                메모 <span className="text-gray-400 text-xs">(선택)</span>
              </label>
              <textarea
                name="memo"
                value={formData.memo}
                onChange={handleChange}
                placeholder="추가 메모를 입력하세요"
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
              />
            </div>

            {/* 버튼 */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                {editingItem ? '수정하기' : '추가하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ItemForm
