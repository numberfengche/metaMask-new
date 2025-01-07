'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

// 定义导航项类型
interface NavItem {
  path: string;
  label: string;
  icon: string;
  selectedIcon: string;
}

const navItems: NavItem[] = [
  { path: '/', label: '首页', icon: '/tabbar/home.png', selectedIcon: '/tabbar/homeSelect.png' },
  { path: '/convert', label: '兑换', icon: '/tabbar/convert.png', selectedIcon: '/tabbar/convertSelect.png' },
  { path: '/pool', label: '矿池', icon: '/tabbar/pool.png', selectedIcon: '/tabbar/poolSelect.png' },
  { path: '/mine', label: '我的', icon: '/tabbar/mine.png', selectedIcon: '/tabbar/mineSelect.png' },
];

const BottomNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('/');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 如果当前不是客户端环境，直接不渲染组件
  if (!isClient) {
    return null; 
  }

  const handleTabClick = (path: string) => {
    setActiveTab(path); 
    router.push(path); 
  };

  return (
    <div className={styles.navbar}>
      {navItems.map(({ path, label, icon, selectedIcon }) => (
        <div
          key={path}
          onClick={() => handleTabClick(path)}
          className={activeTab === path ? styles.item : styles.nomal}
        >
          <img
            src={activeTab === path ? selectedIcon : icon}
            className={styles.img}
            alt={label}
          />
          <span className={styles.textSelect}>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;

