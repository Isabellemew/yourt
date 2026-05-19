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

  const radius = 6; // Большой радиус разлета компонентов

  return (
    <group>
      {items.map((item, index) => {
        const angle = (index / items.length) * Math.PI * 2;
        
        // Позиции по кругу на большем расстоянии
        const targetX = radius * Math.cos(angle);
        const targetZ = radius * Math.sin(angle);
        
        // Пружинная анимация для позиции
        const spring = useSpring({
          position: hovered ? [targetX, 0, targetZ] : [0, 0, 0],
          scale: hovered ? 1 : 0,
          opacity: hovered ? 1 : 0,
          config: { mass: 1, tension: 80, friction: 12, delay: index * 80 }
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
                {/* Рамка для картинок компонентов */}
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  backgroundColor: 'white', 
                  borderRadius: '50%',
                  padding: '12px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '3px solid #c29b62',
                  transition: 'all 0.3s ease',
                  transform: hovered ? 'scale(1.1)' : 'scale(1)'
                }}>
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    // Если картинки нет, браузер покажет сломанную иконку. 
                    // Стилизуем её аккуратно
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                
                {/* Текст всегда читаемый и не зеркальный */}
                <span style={{ 
                  marginTop: '10px', 
                  fontSize: '13px', 
                  color: '#4a453f', 
                  fontWeight: 'bold', 
                  whiteSpace: 'nowrap', 
                  textShadow: '0 2px 4px rgba(255,255,255,0.8), 0 -2px 4px rgba(255,255,255,0.8), 2px 0 4px rgba(255,255,255,0.8), -2px 0 4px rgba(255,255,255,0.8)',
                  backgroundColor: 'rgba(250, 248, 245, 0.85)',
                  padding: '4px 10px',
                  borderRadius: '14px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
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
