import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Sun, Wind, Shield, TreePine, Cpu, Lightbulb } from 'lucide-react';
import './index.css';
import Yurt3D from './Yurt3D';

const yurtParts = [
  {
    id: "shanyrak",
    name: "Шанырак",
    description: "Сердце юрты, окно в небо и символ домашнего очага. В умной юрте здесь располагаются климатические датчики и система автоматической вентиляции.",
    icon: <Sun size={64} strokeWidth={1.5} />,
    components: ["Купол", "Вентиляционный клапан", "Датчики CO2", "Солнечная панель"]
  },
  {
    id: "kerege",
    name: "Кереге",
    description: "Складные решетчатые стены, основа прочности юрты. Модернизированы легкими сплавами и встроенной светодиодной подсветкой.",
    icon: <Shield size={64} strokeWidth={1.5} />,
    components: ["Складные решетки", "LED-подсветка", "Теплоизоляция", "Умные розетки"]
  },
  {
    id: "uyk",
    name: "Уык",
    description: "Жерди, соединяющие кереге и шанырак. Выполняют роль несущего каркаса, в который интегрирована скрытая проводка.",
    icon: <Wind size={64} strokeWidth={1.5} />,
    components: ["Изогнутые жерди", "Скрытая проводка", "Каркасные крепления", "Аудио-система"]
  }
];

const goals = [
  {
    title: "Эко-Традиции",
    desc: "Сохранение древних традиций кочевников с использованием современных, экологически чистых материалов.",
    icon: <TreePine size={32} />
  },
  {
    title: "Умный Дом",
    desc: "Интеграция систем умного дома: климат-контроль, голосовые помощники и автоматизация освещения.",
    icon: <Cpu size={32} />
  },
  {
    title: "Энергоэффективность",
    desc: "Использование солнечной энергии и ветрогенераторов для полной автономности в степи.",
    icon: <Lightbulb size={32} />
  }
];

function App() {
  const [backendData, setBackendData] = useState(null);

  // Example of fetching from Python backend
  useEffect(() => {
    fetch('http://localhost:8001/api/yurt-info')
      .then(res => res.json())
      .then(data => setBackendData(data))
      .catch(err => console.error("Backend not reachable yet", err));
  }, []);

  return (
    <div className="app-container">
      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}
          >
            <Home size={80} color="#cba774" strokeWidth={1} />
          </motion.div>
          <h1>Умная Юрта</h1>
          <p>
            Инновационный проект, объединяющий многовековые традиции кочевников Великой Степи 
            с передовыми технологиями умного дома. Будущее автономного и комфортного жилья.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(194, 155, 98, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              backgroundColor: 'var(--primary)',
              color: '#faf8f5',
              border: 'none',
              borderRadius: '30px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '1rem',
              boxShadow: '0 4px 15px rgba(194, 155, 98, 0.2)'
            }}
          >
            Узнать больше
          </motion.button>
        </motion.div>
      </section>

      {/* 3D Model Section */}
      <section className="yurt-3d-section" style={{ padding: '2rem', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginBottom: '1rem', fontSize: '2.5rem' }}
        >
          Интерактивная 3D Модель
        </motion.h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Наведите курсор (или нажмите на мобильном) на модель, чтобы увидеть компоненты умной юрты.
        </p>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.8)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(194, 155, 98, 0.15)' }}>
          <Yurt3D />
        </div>
      </section>

      {/* Yurt Parts with Exploded View Cards */}
      <section className="yurt-section">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Детали Устройства
        </motion.h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
          Наведите на элементы, чтобы увидеть их внутреннее устройство и технологические компоненты
        </p>

        <div className="yurt-parts-grid">
          {yurtParts.map((part, index) => (
            <motion.div 
              className="yurt-card"
              key={part.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="yurt-card-icon">
                {part.icon}
              </div>
              <h3>{part.name}</h3>
              <p>{part.description}</p>
              
              {/* Exploded View Components visible on hover */}
              <div className="exploded-container">
                {part.components.map((comp, i) => (
                  <div key={i} className="exploded-part" style={{ transitionDelay: `${i * 0.1}s` }}>
                    {comp}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Goals Section */}
      <section className="goals-section">
        <h2>Цели Проекта</h2>
        <div className="goals-grid">
          {goals.map((goal, index) => (
            <motion.div 
              className="goal-item"
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{goal.icon}</div>
              <h4>{goal.title}</h4>
              <p>{goal.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Проект «Умная Юрта». Традиции в новом свете.</p>
        <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.5 }}>
          Built with React, Python & Firebase
        </p>
      </footer>
    </div>
  );
}

export default App;
