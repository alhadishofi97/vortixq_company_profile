# Orange Orb Component - Panduan Penggunaan

Komponen Orb telah diupdate dengan gradient warna orange yang terinspirasi dari screenshot yang Anda berikan. Berikut adalah cara penggunaannya:

## Variant Warna Orange

### 1. Default Orange
```tsx
<Orb orangeVariant="default" />
```
- **Warna**: Deep orange-red (#ff6b35) → Bright orange (#ff8c42) → Golden orange (#ffa726)
- **Karakteristik**: Gradient orange yang hangat dan natural

### 2. Sunset Orange
```tsx
<Orb orangeVariant="sunset" />
```
- **Warna**: Deep red-orange (#d84315) → Bright red-orange (#ff3d00) → Orange (#ff8f00)
- **Karakteristik**: Warna seperti matahari terbenam, lebih hangat dan dramatis

### 3. Vibrant Orange
```tsx
<Orb orangeVariant="vibrant" />
```
- **Warna**: Red-orange (#ff5722) → Pure orange (#ff9800) → Amber (#ffc107)
- **Karakteristik**: Warna yang sangat cerah dan energik

### 4. Golden Orange
```tsx
<Orb orangeVariant="golden" />
```
- **Warna**: Golden yellow (#ffc107) → Bright yellow (#ffeb3b) → Light yellow (#fff176)
- **Karakteristik**: Warna emas yang elegan dan mewah

## Props Lengkap

```tsx
interface OrbProps {
  hue?: number;                    // Rotasi hue (0-360)
  hoverIntensity?: number;         // Intensitas efek hover (0-1)
  rotateOnHover?: boolean;         // Rotasi saat hover
  forceHoverState?: boolean;       // Paksa state hover
  orangeVariant?: 'sunset' | 'vibrant' | 'golden' | 'default';
}
```

## Contoh Penggunaan

### Basic Usage
```tsx
import Orb from './components/animations/Orb';

function MyComponent() {
  return (
    <div className="w-64 h-64">
      <Orb orangeVariant="default" />
    </div>
  );
}
```

### Dengan Custom Hover Effect
```tsx
<Orb 
  orangeVariant="sunset"
  hoverIntensity={0.5}
  rotateOnHover={true}
/>
```

### Dengan Hue Rotation
```tsx
<Orb 
  orangeVariant="vibrant"
  hue={30}  // Rotasi hue 30 derajat
/>
```

## Kombinasi dengan Background

Untuk efek yang optimal, gunakan background hitam:

```tsx
<div className="w-full h-screen bg-black flex items-center justify-center">
  <div className="w-96 h-96">
    <Orb orangeVariant="default" />
  </div>
</div>
```

## Demo Component

Gunakan `OrangeOrbDemo` untuk melihat semua variant sekaligus:

```tsx
import OrangeOrbDemo from './components/animations/OrangeOrbDemo';

function App() {
  return <OrangeOrbDemo />;
}
```

## Tips Penggunaan

1. **Ukuran**: Komponen akan menyesuaikan dengan container parent
2. **Performance**: Komponen menggunakan WebGL, pastikan browser mendukung
3. **Responsive**: Gunakan container dengan ukuran yang konsisten
4. **Interaksi**: Hover effect bekerja dengan mouse movement
5. **Customization**: Kombinasikan dengan `hue` prop untuk variasi warna tambahan

## Warna Hex yang Digunakan

- **Default**: #ff6b35, #ff8c42, #ffa726
- **Sunset**: #d84315, #ff3d00, #ff8f00  
- **Vibrant**: #ff5722, #ff9800, #ffc107
- **Golden**: #ffc107, #ffeb3b, #fff176
