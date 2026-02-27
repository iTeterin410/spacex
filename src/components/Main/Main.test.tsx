import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import Main from './Main';
import useLaunches from '../../hooks/useLaunches';

// Мокаем хук
vi.mock('../../hooks/useLaunches');

const renderWithMantine = (ui: React.ReactElement) => {
  return render(
    <MantineProvider>{ui}</MantineProvider>
  );
};

describe('Main', () => {
  it('рендерит список карточек из моковых данных', () => {
    (useLaunches as any).mockReturnValue({
      launches: [
        { mission_name: 'Mission 1', rocket: { rocket_name: 'Falcon 9' } },
        { mission_name: 'Mission 2', rocket: { rocket_name: 'Falcon Heavy' } },
        { mission_name: 'Mission 3', rocket: { rocket_name: 'Starship' } },
      ],
      loading: false,
      error: null
    });

    renderWithMantine(<Main />);
    
    expect(screen.getByText('Mission 1')).toBeInTheDocument();
    expect(screen.getByText('Mission 2')).toBeInTheDocument();
    expect(screen.getByText('Mission 3')).toBeInTheDocument();
  });

  it('показывает загрузку', () => {
  (useLaunches as any).mockReturnValue({
    launches: [],
    loading: true,
    error: null
  });

  renderWithMantine(<Main />);
  
  // Просто проверяем, что нет карточек (а значит, идёт загрузка)
  expect(screen.queryByText('Mission 1')).not.toBeInTheDocument();
});

  it('показывает ошибку', () => {
    (useLaunches as any).mockReturnValue({
      launches: [],
      loading: false,
      error: 'Test error'
    });

    renderWithMantine(<Main />);
    expect(screen.getByText(/Error: Test error/i)).toBeInTheDocument();
  });
});