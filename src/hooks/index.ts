'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useCallback, useRef } from 'react';
import { RootState } from '@//store';
import { setCredentials, logout } from '@//store/slices/authSlice';
import { authService } from '@//services/auth/auth.service';
import { STORAGE_KEYS, ROLE_PERMISSIONS } from '@//constants';
import { User, Role } from '@//types';

export function useAuth() {
  const dispatch = useDispatch();
  const { user, accessToken, isAuthenticated } = useSelector((s: RootState) => s.auth);

  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (token && savedUser) {
        try {
          dispatch(setCredentials({ user: JSON.parse(savedUser), accessToken: token }));
        } catch {}
      }
    }
  }, [dispatch, isAuthenticated]);

  const login = async (email: string, password: string) => {
    const res = await authService.login(email, password);
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, res.data.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, res.data.refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.data.user));
    dispatch(setCredentials({ user: res.data.user, accessToken: res.data.accessToken }));
    return res.data.user;
  };

  const register = async (data: { firstName: string; lastName: string; email: string; password: string }) => {
    const res = await authService.register(data);
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, res.data.accessToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.data.user));
    dispatch(setCredentials({ user: res.data.user, accessToken: res.data.accessToken }));
    return res.data.user;
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    dispatch(logout());
  };

  return { user, accessToken, isAuthenticated, login, register, logout: signOut };
}

export function useCurrentUser() {
  const { user } = useAuth();
  return user;
}

export function usePermissions() {
  const { user } = useAuth();
  const permissions = user ? ROLE_PERMISSIONS[user.role] || [] : [];
  const hasPermission = useCallback((perm: string) => permissions.includes(perm), [permissions]);
  const hasRole = useCallback((role: Role) => user?.role === role, [user]);
  return { permissions, hasPermission, hasRole };
}

export function useSidebar() {
  const dispatch = useDispatch();
  const { sidebarCollapsed, mobileSidebarOpen } = useSelector((s: RootState) => s.ui);
  return {
    collapsed: sidebarCollapsed,
    mobileOpen: mobileSidebarOpen,
    toggle: () => dispatch({ type: 'ui/toggleSidebar' }),
    toggleMobile: () => dispatch({ type: 'ui/toggleMobileSidebar' }),
  };
}

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export function usePagination(total: number, pageSize: number) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(total / pageSize);
  return {
    page,
    pageSize,
    totalPages,
    setPage,
    canNext: page < totalPages,
    canPrev: page > 1,
    next: () => setPage((p) => Math.min(p + 1, totalPages)),
    prev: () => setPage((p) => Math.max(p - 1, 1)),
  };
}

export function useModal() {
  const [open, setOpen] = useState(false);
  return { open, onOpen: () => setOpen(true), onClose: () => setOpen(false), onToggle: () => setOpen((o) => !o) };
}

export function useClickOutside<T extends HTMLElement>(handler: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [handler]);
  return ref;
}
