import { useState, useEffect } from 'react'
import Header from './components/Header'
import StorageToggle from './components/StorageToggle'
import ItemList from './components/ItemList'
import ItemForm from './components/ItemForm'
import CategoryManager from './components/CategoryManager'
import { db } from './firebase/config'
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  writeBatch
} from 'firebase/firestore'

// 기본 카테고리
const DEFAULT_CATEGORIES = [
  { id: 'vegetables', name: '채소', isDefault: true },
  { id: 'fruits', name: '과일', isDefault: true },
  { id: 'meat', name: '육류', isDefault: true },
  { id: 'seafood', name: '해산물', isDefault: true },
  { id: 'dairy', name: '유제품', isDefault: true },
  { id: 'beverages', name: '음료', isDefault: true },
  { id: 'seasonings', name: '조미료', isDefault: true },
  { id: 'others', name: '기타', isDefault: true }
]

function App() {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [currentStorage, setCurrentStorage] = useState('refrigerator') // 'refrigerator' or 'freezer'
  const [showItemForm, setShowItemForm] = useState(false)
  const [showCategoryManager, setShowCategoryManager] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // 아이템 실시간 구독
  useEffect(() => {
    const q = query(collection(db, 'items'), orderBy('order', 'asc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setItems(itemsData)
    })
    return () => unsubscribe()
  }, [])

  // 카테고리 실시간 구독
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
      if (snapshot.empty) {
        // 카테고리가 없으면 기본 카테고리 추가
        initializeCategories()
      } else {
        const categoriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setCategories(categoriesData)
      }
    })
    return () => unsubscribe()
  }, [])

  // 기본 카테고리 초기화
  const initializeCategories = async () => {
    const batch = writeBatch(db)
    DEFAULT_CATEGORIES.forEach(category => {
      const docRef = doc(db, 'categories', category.id)
      batch.set(docRef, category)
    })
    await batch.commit()
  }

  // 아이템 추가
  const addItem = async (itemData) => {
    const filteredItems = items.filter(item => item.storage === itemData.storage)
    const maxOrder = filteredItems.length > 0 
      ? Math.max(...filteredItems.map(item => item.order || 0)) 
      : 0
    
    await addDoc(collection(db, 'items'), {
      ...itemData,
      order: maxOrder + 1,
      createdAt: new Date()
    })
    setShowItemForm(false)
  }

  // 아이템 수정
  const updateItem = async (id, itemData) => {
    const itemRef = doc(db, 'items', id)
    await updateDoc(itemRef, itemData)
    setEditingItem(null)
    setShowItemForm(false)
  }

  // 아이템 삭제
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id))
  }

  // 아이템 순서 변경
  const moveItem = async (id, direction) => {
    const filteredItems = items
      .filter(item => item.storage === currentStorage)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
    
    const currentIndex = filteredItems.findIndex(item => item.id === id)
    if (currentIndex === -1) return
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= filteredItems.length) return
    
    const batch = writeBatch(db)
    const currentItem = filteredItems[currentIndex]
    const swapItem = filteredItems[newIndex]
    
    batch.update(doc(db, 'items', currentItem.id), { order: swapItem.order || 0 })
    batch.update(doc(db, 'items', swapItem.id), { order: currentItem.order || 0 })
    
    await batch.commit()
  }

  // 카테고리 추가
  const addCategory = async (name) => {
    const id = 'custom_' + Date.now()
    await addDoc(collection(db, 'categories'), {
      id,
      name,
      isDefault: false
    })
  }

  // 카테고리 삭제
  const deleteCategory = async (id) => {
    const categoryDoc = categories.find(c => c.id === id)
    if (categoryDoc && !categoryDoc.isDefault) {
      await deleteDoc(doc(db, 'categories', categoryDoc.id))
    }
  }

  // 현재 저장소와 카테고리에 맞는 아이템 필터링
  const filteredItems = items
    .filter(item => item.storage === currentStorage)
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
    .sort((a, b) => (a.order || 0) - (b.order || 0))

  // 수정 모드 열기
  const openEditForm = (item) => {
    setEditingItem(item)
    setShowItemForm(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header 
        onAddClick={() => {
          setEditingItem(null)
          setShowItemForm(true)
        }}
        onCategoryClick={() => setShowCategoryManager(true)}
      />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <StorageToggle 
          currentStorage={currentStorage} 
          onStorageChange={setCurrentStorage}
        />
        
        {/* 카테고리 필터 */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            전체
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.name
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <ItemList 
          items={filteredItems}
          onEdit={openEditForm}
          onDelete={deleteItem}
          onMove={moveItem}
        />
      </main>

      {/* 아이템 추가/수정 모달 */}
      {showItemForm && (
        <ItemForm
          categories={categories}
          currentStorage={currentStorage}
          editingItem={editingItem}
          onSubmit={editingItem 
            ? (data) => updateItem(editingItem.id, data) 
            : addItem
          }
          onClose={() => {
            setShowItemForm(false)
            setEditingItem(null)
          }}
        />
      )}

      {/* 카테고리 관리 모달 */}
      {showCategoryManager && (
        <CategoryManager
          categories={categories}
          onAdd={addCategory}
          onDelete={deleteCategory}
          onClose={() => setShowCategoryManager(false)}
        />
      )}
    </div>
  )
}

export default App
