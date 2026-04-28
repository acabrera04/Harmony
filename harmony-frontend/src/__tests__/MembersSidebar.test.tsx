import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MembersSidebar } from '../components/channel/MembersSidebar';
import type { User } from '../types';

/* eslint-disable @next/next/no-img-element */
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={props.alt ?? ''} {...props} />
  ),
}));

const MEMBERS: User[] = [
  {
    id: '1',
    username: 'owner-online',
    displayName: 'Owner Online',
    role: 'owner',
    status: 'online',
  },
  {
    id: '2',
    username: 'member-idle',
    displayName: 'Member Idle',
    role: 'member',
    status: 'idle',
  },
  {
    id: '3',
    username: 'admin-offline',
    displayName: 'Admin Offline',
    role: 'admin',
    status: 'offline',
  },
  {
    id: '4',
    username: 'guest-offline',
    displayName: 'Guest Offline',
    role: 'guest',
    status: 'offline',
  },
];

describe('MembersSidebar', () => {
  it('separates online and offline users into distinct sections', () => {
    render(<MembersSidebar members={MEMBERS} isOpen />);

    expect(screen.getByText('Online — 2')).toBeInTheDocument();
    expect(screen.getByText('Offline — 2')).toBeInTheDocument();
    expect(screen.queryByText('Members — 1')).not.toBeInTheDocument();
  });

  it('keeps role priority within each section', () => {
    render(<MembersSidebar members={MEMBERS} isOpen />);

    const onlineHeading = screen.getByText('Online — 2');
    const offlineHeading = screen.getByText('Offline — 2');
    const onlineList = onlineHeading.nextElementSibling;
    const offlineList = offlineHeading.nextElementSibling;

    expect(onlineList).not.toBeNull();
    expect(offlineList).not.toBeNull();

    const onlineRows = within(onlineList as HTMLElement).getAllByRole('listitem');
    const offlineRows = within(offlineList as HTMLElement).getAllByRole('listitem');

    expect(onlineRows[0]).toHaveTextContent('Owner Online');
    expect(onlineRows[1]).toHaveTextContent('Member Idle');
    expect(offlineRows[0]).toHaveTextContent('Admin Offline');
    expect(offlineRows[1]).toHaveTextContent('Guest Offline');
  });
});
