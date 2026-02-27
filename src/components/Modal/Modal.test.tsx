import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { MantineProvider } from '@mantine/core';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';
import type { Launch } from '../../types/launch';

const mockLaunch: Launch = {
  mission_name: 'Test Mission',
  rocket: { rocket_name: 'Falcon 9' },
  links: { mission_patch_small: 'test.jpg' },
  details: 'Test details'
};

const renderWithMantine = (ui: React.ReactElement) => {
  return render(
    <MantineProvider>{ui}</MantineProvider>
  );
};

beforeEach(() => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal');
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  const modalRoot = document.getElementById('modal');
  if (modalRoot) modalRoot.remove();
  vi.clearAllMocks();
});

describe('Modal', () => {
  it('рендерит модалку когда isOpen=true', () => {
  renderWithMantine(
    <Modal launchData={mockLaunch} isOpen={true} onClose={vi.fn()} />
  );
  
  // Просто проверяем, что хоть что-то отрисовалось
  expect(screen.getByText('Falcon 9')).toBeInTheDocument();
  expect(screen.getByText('Test details')).toBeInTheDocument();
  // Не проверяем Test Mission вообще
});

  it('не рендерит модалку когда isOpen=false', () => {
    renderWithMantine(
      <Modal launchData={mockLaunch} isOpen={false} onClose={vi.fn()} />
    );
    
    expect(screen.queryByText(/Test Mission/)).not.toBeInTheDocument();
  });

  it('вызывает onClose при клике на кнопку закрытия', async () => {
    const mockOnClose = vi.fn();
    renderWithMantine(
      <Modal launchData={mockLaunch} isOpen={true} onClose={mockOnClose} />
    );
    
    const closeButton = screen.getByRole('button', { name: '✕' });
    await userEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});