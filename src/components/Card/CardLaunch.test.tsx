import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { MantineProvider } from '@mantine/core';
import userEvent from '@testing-library/user-event';
import CardLaunch from './CardLaunch';
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

describe('CardLaunch', () => {
  it('рендерит карточку с данными о запуске', () => {
    renderWithMantine(<CardLaunch launchData={mockLaunch} />);
    
    expect(screen.getByText('Test Mission')).toBeInTheDocument();
    expect(screen.getByText('Falcon 9')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /see more/i })).toBeInTheDocument();
  });

  it('открывает модалку при клике на кнопку', async () => {
    renderWithMantine(<CardLaunch launchData={mockLaunch} />);
    

    expect(screen.queryByText('Test details')).not.toBeInTheDocument();
    

    const button = screen.getByRole('button', { name: /see more/i });
    await userEvent.click(button);
    

    expect(screen.getByText('Test details')).toBeInTheDocument();
  });
});