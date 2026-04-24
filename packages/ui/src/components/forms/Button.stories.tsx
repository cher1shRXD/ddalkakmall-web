import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Basic = () => <Button>클릭</Button>;
export const Variants = () => (
  <div style={{ display: 'flex', gap: 10 }}>
    <Button variant="primary">기본</Button>
    <Button variant="secondary">보조</Button>
    <Button variant="ghost">고스트</Button>
    <Button variant="danger">위험</Button>
    <Button variant="outline">외곽선</Button>
  </div>
);
