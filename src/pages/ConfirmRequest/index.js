import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PurchaseFlow from '../../assets/purchaseFlow-3.gif';
import BarCode from '../../assets/barCode.jpg';
import PixIcon from '../../assets/pixIcon.png';

function ConfirmRequest() {
  const [freight, setFreight] = useState(0);
  const history = useHistory();
  const {
    name,
    address,
    residenceNumber,
    district,
    city,
    state,
    cep,
    country,
    phone,
    paymentMethod
  } = JSON.parse(localStorage.getItem("user")).data;
  const cartProducts = JSON.parse(localStorage.getItem("cart"));
  const total = cartProducts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const finishPayment = () => {
    const endTotal = total + Number(freight);
    localStorage.setItem('endTotal', JSON.stringify(endTotal));
    history.push('/finish-payment');
  }

  return (
    <main className="p-[20px]">
      <img
        src={PurchaseFlow}
        alt="purchase flow"
        className="w-[400px] ml-[100px]"
      />
      <h1 className="font-semibold ml-[100px] mt-[20px]">
        Confira e finalize seu pedido
      </h1>
      <section className="text-[10px] w-[750px] ml-[100px] mt-[20px] flex">
        <div className="w-[70%]">
          <div className="flex justify-between border border-[#cacaca] rounded-[2px] p-[10px]">
            <div className="text-[10px]">
              <p className="font-bold">Endereço de entrega</p>
              <p>{name}</p>
              <p>{`${address} ${residenceNumber}`}</p>
              <p>{district}</p>
              <p>{`${city}, ${state} ${cep}`}</p>
              <p>{country}</p>
              <p>{`Telefone: ${phone}`}</p>
            </div>
            <div>
              <p className="font-bold">Forma de pagamento</p>
              <div className="flex">
                {paymentMethod === "Boleto" ? (
                  <img
                    src={BarCode}
                    alt="bar code"
                    className="w-[30px] h-[15px]"
                  />
                ) : (
                  <img src={PixIcon} alt="pix icon" className="w-[20px]" />
                )}
                <p className="ml-[5px]">{paymentMethod}</p>
              </div>
            </div>
            <div>
              <p className="font-bold">Cupom de desconto ou Vale-presente</p>
              <div>
                <input
                  type="text"
                  placeholder="Digitar código"
                  className="border border-[#bdbdbd] outline-none w-[100px] h-[20px] rounded-[2px]"
                />
                <button
                  type="button"
                  className="bg-[#d8dde6] h-[20px] w-[44px] ml-[5px] rounded-[2px] border border-[#a3a3a3] bg-gradient-to-t from-[#d4d4d4] to-[#ececec]"
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
          <div className="border border-[#cacaca] rounded-[2px] p-[10px] mt-[10px]">
            <h3 className="text-[#e47911] text-[12px] font-bold">
              Entrega estimada: 7 abr 2022 - 13 abr 2022
            </h3>
            <div className="flex">
              <div>
                {cartProducts.map((product) => (
                  <div key={product.title} className="flex mt-[15px]">
                    <div>
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-[60px]"
                      />
                    </div>
                    <div className="flex flex-col justify-center ml-[15px] w-[200px]">
                      <p className="font-bold">{product.title}</p>
                      <p className="font-bold text-[#b12704]">{`R$ ${product.price}`}</p>
                      <p className="font-bold">{`Quantidade: ${product.quantity}`}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="ml-[30px] mt-[12px] flex flex-col">
                <p className="font-bold">Opção de entrega</p>
                <label className="mt-[5px] flex">
                  <input
                    type="radio"
                    name="freight"
                    value={0}
                    onChange={({ target }) => setFreight(target.value)}
                    />
                  <span className="ml-[5px]">Frete GRÁTIS</span>
                </label>
                <label className="mt-[6px]">
                  <input
                    type="radio"
                    name="freight"
                    value={8.90}
                    onChange={({ target }) => setFreight(target.value)}
                  />
                  <span className="ml-[5px]">R$ 8,90 Entrega Padrão</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-[#cacaca] rounded-[2px] p-[10px] ml-[12px] w-[200px] h-[100%]">
          <button
            type="button"
            className="text-[10px] bg-gradient-to-t from-[#f0c14b] to-[#f7dfa5] hover:brightness-[96%] rounded-[2px] border border-[#a88734] w-[100%] h-[22px]"
            onClick={(e) => {
              e.preventDefault();
              finishPayment();
            }}
          >
            Confirmar pedido
          </button>
          <h3 className="font-bold mt-[10px]">Resumo do pedido</h3>
          <div className='w-[100%] flex justify-between mt-[5px]'>
            <span>Itens:</span>
            <span>{`R$ ${total}`}</span>
          </div>
          {
            Number(freight) > 0
            && (
              <div className='w-[100%] flex justify-between mt-[5px] border-b border-[#dadada]'>
                <span>Frete e manuseio:</span>
                <span>R$ 8,90</span>
              </div>
            )
          }
          <div className='w-[100%] flex justify-between mt-[5px] text-[14px] font-bold text-[#b12704]'>
            <span>Total do pedido:</span>
            <span>{`R$ ${total + Number(freight)}`}</span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ConfirmRequest;
