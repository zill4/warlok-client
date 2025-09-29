import type { ReactNode } from 'react';
import { lazy, Suspense } from 'react';
import './Counter.css';

const Message = lazy(async () => import('./Message'));
const Fallback = () => <p>Loading...</p>;

type Props = {
	children: ReactNode;
	count: number;
	onIncrement: () => void;
	onDecrement: () => void;
};

export default function Counter({ children, count, onIncrement, onDecrement }: Props) {
	return (
		<>
			<div className="counter">
				<button onClick={onDecrement}>-</button>
				<pre>{count}</pre>
				<button onClick={onIncrement}>+</button>
			</div>
			<Suspense fallback={<Fallback />}>
				<Message>{children}</Message>
			</Suspense>
		</>
	);
}
