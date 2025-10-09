# Product Carousel Centering - Dokumentasi Perubahan

## Perubahan yang Dilakukan

Telah dimodifikasi komponen `ProductCarousel` untuk memposisikan produk di tengah ketika hanya ada 1 produk, sesuai dengan permintaan untuk section "Our Product".

## Fitur Baru

### 1. **Auto-Centering untuk 1 Produk**
- Ketika `products.length === 1`, produk akan otomatis diposisikan di tengah container
- Ukuran card disesuaikan menjadi 80% dari container width (maksimal 600px)
- Menggunakan `justify-center` class untuk centering horizontal

### 2. **Disable Interaksi yang Tidak Perlu**
- **Drag/Swipe**: Dinonaktifkan ketika hanya ada 1 produk
- **Auto-slide**: Tidak berjalan ketika hanya ada 1 produk
- **Dots Indicator**: Disembunyikan ketika hanya ada 1 produk
- **Swipe Indicator**: Disembunyikan ketika hanya ada 1 produk

### 3. **Responsive Design**
- Tetap responsif untuk berbagai ukuran layar
- Ukuran card disesuaikan dengan container width
- Maksimal width 600px untuk tampilan yang optimal

## Kode yang Dimodifikasi

### 1. **updateCardWidth Function**
```typescript
// Jika hanya ada 1 produk, posisikan di tengah
if (products.length === 1) {
  newVisibleCards = 1;
  newCardWidth = Math.min(containerWidth * 0.8, 600); // 80% dari container width, max 600px
} else {
  // Logic untuk multiple products...
}
```

### 2. **Motion.div Configuration**
```typescript
<motion.div
  className={`flex cursor-grab active:cursor-grabbing ${products.length === 1 ? 'justify-center' : ''}`}
  animate={{ 
    x: products.length === 1 
      ? 0 // Untuk 1 produk, posisikan di tengah (x = 0)
      : isDragging ? -currentIndex * cardWidth + dragX : -currentIndex * cardWidth 
  }}
  drag={products.length > 1 ? "x" : false} // Disable drag untuk 1 produk
  style={{ 
    width: products.length === 1 ? '100%' : `${products.length * cardWidth}px`,
    willChange: isDragging ? 'transform' : 'auto'
  }}
>
```

### 3. **Conditional Rendering**
```typescript
{/* Dots Indicator - hanya tampil jika ada lebih dari 1 produk */}
{products.length > 1 && dotsIndicator}

{/* Swipe Indicator - hanya tampil jika ada lebih dari 1 produk */}
{products.length > 1 && (
  <div className="flex justify-center mt-4">
    {/* Swipe indicator content */}
  </div>
)}
```

## Hasil

### Untuk 1 Produk:
- ✅ Produk diposisikan di tengah container
- ✅ Ukuran card optimal (80% container width, max 600px)
- ✅ Tidak ada dots indicator
- ✅ Tidak ada swipe indicator
- ✅ Drag/swipe dinonaktifkan
- ✅ Auto-slide dinonaktifkan

### Untuk Multiple Products:
- ✅ Tetap menggunakan behavior asli
- ✅ Drag/swipe enabled
- ✅ Auto-slide enabled
- ✅ Dots indicator tampil
- ✅ Swipe indicator tampil

## Penggunaan

Tidak ada perubahan dalam cara penggunaan komponen. Perubahan ini otomatis berdasarkan jumlah produk yang diberikan:

```tsx
// Untuk 1 produk - akan otomatis di-center
const singleProduct = [product1];

// Untuk multiple products - akan menggunakan behavior asli
const multipleProducts = [product1, product2, product3];

<ProductCarousel
  products={singleProduct} // Akan di-center otomatis
  onProductClick={handleClick}
/>
```

## Testing

Perubahan ini telah diuji untuk:
- ✅ 1 produk (centering)
- ✅ Multiple products (behavior asli)
- ✅ Responsive design
- ✅ Drag/swipe functionality
- ✅ Auto-slide functionality
