// 소비기한 상태 계산
function getExpiryStatus(expiryDate) {
  if (!expiryDate) return 'none'
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const expiry = new Date(expiryDate)
  expiry.setHours(0, 0, 0, 0)
  
  const diffTime = expiry - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'expired'
  if (diffDays <= 3) return 'warning'
  return 'safe'
}

// 날짜 포맷팅
function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${date.getMonth() + 1}/${date.getDate()}`
}

// D-Day 계산
function getDDay(expiryDate) {
  if (!expiryDate) return null
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const expiry = new Date(expiryDate)
  expiry.setHours(0, 0, 0, 0)
  
  const diffTime = expiry - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'D-Day'
  if (diffDays > 0) return `D-${diffDays}`
  return `D+${Math.abs(diffDays)}`
}

function ItemCard({ item, onEdit, onDelete, onMove, isFirst, isLast }) {
  const expiryStatus = getExpiryStatus(item.expiryDate)
  const dDay = getDDay(item.expiryDate)
  
  const statusColors = {
    expired: 'border-l-4 border-l-red-500 bg-red-50',
    warning: 'border-l-4 border-l-yellow-500 bg-yellow-50',
    safe: 'border-l-4 border-l-green-500 bg-white',
    none: 'border-l-4 border-l-gray-300 bg-white'
  }

  const dDayColors = {
    expired: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-700',
    safe: 'bg-green-100 text-green-700',
    none: ''
  }

  return (
    <div className={`rounded-lg shadow-sm p-4 ${statusColors[expiryStatus]} hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between gap-3">
        {/* 왼쪽: 정보 영역 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 text-lg truncate">{item.name}</h3>
            {item.quantity && (
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                {item.quantity}
              </span>
            )}
            {dDay && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${dDayColors[expiryStatus]}`}>
                {dDay}
              </span>
            )}
          </div>
          
          <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs">
              {item.category}
            </span>
            {item.expiryDate && (
              <span>📅 {formatDate(item.expiryDate)}</span>
            )}
          </div>
          
          {item.memo && (
            <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
              💬 {item.memo}
            </p>
          )}
        </div>
        
        {/* 오른쪽: 버튼 영역 */}
        <div className="flex flex-col gap-1">
          {/* 순서 조정 버튼 */}
          <div className="flex gap-1">
            <button
              onClick={() => onMove(item.id, 'up')}
              disabled={isFirst}
              className={`p-1.5 rounded transition-colors ${
                isFirst 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
              }`}
              title="위로 이동"
            >
              ▲
            </button>
            <button
              onClick={() => onMove(item.id, 'down')}
              disabled={isLast}
              className={`p-1.5 rounded transition-colors ${
                isLast 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-500 hover:bg-gray-200 hover:text-gray-700'
              }`}
              title="아래로 이동"
            >
              ▼
            </button>
          </div>
          
          {/* 수정/삭제 버튼 */}
          <div className="flex gap-1">
            <button
              onClick={() => onEdit(item)}
              className="p-1.5 text-indigo-500 hover:bg-indigo-100 rounded transition-colors"
              title="수정"
            >
              ✏️
            </button>
            <button
              onClick={() => {
                if (confirm(`"${item.name}"을(를) 삭제하시겠습니까?`)) {
                  onDelete(item.id)
                }
              }}
              className="p-1.5 text-red-500 hover:bg-red-100 rounded transition-colors"
              title="삭제"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemCard
