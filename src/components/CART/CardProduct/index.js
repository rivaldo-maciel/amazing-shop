import React, {useState, useEffect } from 'react';

function CardProduct({ title, price, thumbnail, quantity, setReload }) {
  const [qnty, setQnty] = useState(1);

  useEffect(() => {
    if (qnty >= 1) {
      const cartList = JSON.parse(localStorage.getItem('cart'));
      const newCarList = cartList.filter((product) => product.title !== title);
      const editedItem = cartList.find((product) => product.title === title);
      editedItem.quantity = qnty;
      localStorage.setItem('cart', JSON.stringify([...newCarList, editedItem]));
    }
  }, [qnty, title])

  useEffect(() => {
    setReload(prevState => !prevState);
  }, [qnty, setReload])

  useEffect(() => {
    setQnty(quantity);
  }, [quantity])

  const deleteProduct = () => {
    const cartList = JSON.parse(localStorage.getItem('cart'));
    const itemToDelete = cartList.find((product) => product.title === title);
    const newCartList = cartList.filter((product) => product.title !== itemToDelete.title);
    localStorage.setItem('cart', JSON.stringify(newCartList));
    setReload(prevState => !prevState);
  }

  return (
    <div className="grid grid-cols-[100px_auto_auto] border-b border-[#d3d3d3] pb-[12px] w-[100%]">
      <div>
        <img
          src={thumbnail}
          alt="product"
          className="w-[100px]"
        />
      </div>
      <div className="ml-[10px]">
        <p className="text-[14px]">{title}</p>
        <p className="text-[10px] text-[green]">Em estoque</p>
        <div className="flex">
          <select
            value={qnty}
            className="text-[12px] h-[20px] shadow-md outline-[#3cc8eb] rounded-[5px] bg-[#e7e7e7] border border-[#9e9e9e]"
            onChange={({ target }) => {
              setQnty(target.value)
            }}
          >
            {Array.from(Array(31).keys())
              .filter((numb) => numb !== 0)
              .map((number) => (
                <option className="" key={number}>{number}</option>
              ))}
          </select>
          <span className="text-[10px] text-[#aaa9a9] self-center ml-[5px]">|</span>
          <span
            className="text-[10px] ml-[6px] self-center text-[#007185] cursor-pointer"
            onClick={deleteProduct}
          >Excluir</span>
        </div>
      </div>
      <div className="justify-self-end">
        <span className="font-bold mr-0">{`R$ ${price}`}</span>
      </div>
    </div>
  );
}

export default CardProduct;