import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Basic = () => <Button>Click me</Button>;
export const Variants = () => (
  <div style={{ display: 'flex', gap: 10 }}>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="outline">Outline</Button>
  </div>
);
