function StorageToggle({ currentStorage, onStorageChange }) {
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-white rounded-xl p-1 shadow-md inline-flex">
        <button
          onClick={() => onStorageChange('refrigerator')}
          className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
            currentStorage === 'refrigerator'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="text-xl">🥬</span>
          <span>냉장</span>
        </button>
        <button
          onClick={() => onStorageChange('freezer')}
          className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
            currentStorage === 'freezer'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="text-xl">🧊</span>
          <span>냉동</span>
        </button>
      </div>
    </div>
  )
}

export default StorageToggle
