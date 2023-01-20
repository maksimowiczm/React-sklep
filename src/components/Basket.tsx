import { useAppContext } from "../App";

const Basket = () => {
    const { basket } = useAppContext();

    return <>{basket.map((p) => p.name)}</>;
};

export default Basket;
