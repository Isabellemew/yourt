import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

function FlyingComponents({ hovered }) {
  // Define the 7 specific components with image paths
  // Вы сможете заменить эти картинки, положив свои файлы в папку public/
  const items = [
    { name: "Линейный актуатор", img: "/actuator.png" },
    { name: "Датчик темп. и влаж.", img: "/sensor.png" },
    { name: "RGB светодиод", img: "/rgb.png" },
    { name: "Светодиодная лента", img: "/led.png" },
    { name: "Реле модуль", img: "/relay.png" },
    { name: "ESP", img: "/esp.png" },
    { name: "Arduino", img: "/arduino.png" }
  ];

  // Сетка позиций по квадрату (3x3)
  const gridPositions = [
    [-5, 0, -5], [-5, 0, 0], [-5, 0, 5],    // Левая колонна
    [0, 0, -5],  [0, 0, 0],  [0, 0, 5],     // Центральная колонна
    [5, 0, -5],  [5, 0, 0],  [5, 0, 5]      // Правая колонна
  ];

  return (
    <group>
      {items.map((item, index) => {
        // Используем сетку или крайние точки
        const targetPos = index < gridPositions.length ? gridPositions[index] : [-5, 0, -5];
        
        // Пружинная анимация для позиции
        const spring = useSpring({
          position: hovered ? targetPos : [0, 0, 0],
          scale: hovered ? 1 : 0,
          opacity: hovered ? 1 : 0,
          config: { mass: 1, tension: 80, friction: 12, delay: index * 50 }
        });

        return (
          <a.group key={index} position={spring.position} scale={spring.scale}>
            {/* Html позволяет использовать обычные HTML-теги и картинки прямо в 3D.
                Они всегда повернуты к пользователю (текст не отзеркаливается!) */}
            <Html center zIndexRange={[100, 0]}>
              <div 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  opacity: spring.opacity.get ? spring.opacity.get() : spring.opacity,
                  pointerEvents: 'none'
                }}
              >
                {/* Рамка для картинок компонентов — более заметная и яркая */}
                <div style={{ 
                  width: '90px', 
                  height: '90px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  borderRadius: '50%',
                  padding: '12px',
                  boxShadow: '0 12px 35px rgba(194, 155, 98, 0.35), 0 0 0 3px rgba(194, 155, 98, 0.2)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '4px solid #c29b62',
                  transition: 'all 0.3s ease',
                  transform: hovered ? 'scale(1.15) drop-shadow(0 8px 20px rgba(0,0,0,0.2))' : 'scale(1)',
                  backdropFilter: 'blur(4px)'
                }}>
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    style={{ width: '85%', height: '85%', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                
                {/* Текст хорошо читаемый и видный */}
                <span style={{ 
                  marginTop: '12px', 
                  fontSize: '12px', 
                  color: '#2b2520', 
                  fontWeight: '700', 
                  whiteSpace: 'nowrap', 
                  textShadow: '0 2px 6px rgba(255,255,255,0.9)',
                  backgroundColor: 'rgba(250, 248, 245, 0.92)',
                  padding: '6px 14px',
                  borderRadius: '16px',
                  boxShadow: '0 4px 12px rgba(194, 155, 98, 0.25), inset 0 1px 2px rgba(255,255,255,0.8)',
                  border: '1px solid rgba(194, 155, 98, 0.3)'
                }}>
                  {item.name}
                </span>
              </div>
            </Html>
          </a.group>
        );
      })}
    </group>
  );
}

export default function Yurt3D() {
  const [hovered, setHovered] = useState(false);

  return (
    <div 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '600px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        cursor: 'pointer'
      }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Главная картинка юрты */}
      <div style={{
        position: 'absolute',
        zIndex: 10,
        width: '350px',
        height: '350px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.4s ease',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        pointerEvents: 'none'
      }}>
        <img 
          src="/yurt-image.png" 
          alt="Моя Умная Юрта" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </div>

      {/* 3D Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 4, 8], fov: 45 }}>
          {/* autoRotateSpeed заставляет компоненты кружиться вокруг юрты */}
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={hovered} autoRotateSpeed={2} />
          <FlyingComponents hovered={hovered} />
        </Canvas>
      </div>
    </div>
  );
}
