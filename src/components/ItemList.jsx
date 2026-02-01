import ItemCard from './ItemCard'

function ItemList({ items, onEdit, onDelete, onMove }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-gray-500 text-lg">등록된 식재료가 없습니다.</p>
        <p className="text-gray-400 text-sm mt-1">상단의 추가 버튼을 눌러 식재료를 등록해보세요!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <ItemCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onMove={onMove}
          isFirst={index === 0}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  )
}

export default ItemList
