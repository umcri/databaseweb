
// 고객 등록
document.getElementById('customer-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.cusName.value;
  const phone = e.target.phone.value;
  const address = e.target.address.value;
  const gender = e.target.gender.value;
  if (!name) {
    return alert('이름을 입력하세요');
  }
  if (!phone) {
    return alert('전화번호를 입력하세요');
  }
  if (!address) {
    return alert('주소를 입력하세요');
  }
  try {
    await axios.post('/customers', { name, phone, address, gender });
  } catch (err) {
    console.error(err);
  }
  e.target.cusName.value = '';
  e.target.phone.value = '';
  e.target.address.value = '';
  e.target.sex.value = '';
});
// 거래 등록
document.getElementById('transaction-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const transNum = e.target.transNum.value;
  const productID = e.target.productID.value;
  const price = e.target.price.value;
  const date = e.target.date.value;
  const cusName = e.target.cusName.value;
  if (!transNum) {
    return alert('거래번호를 입력하세요');
  }
  if (!productID) {
    return alert('상품ID을 입력하세요');
  }
  if (!price) {
    return alert('가격을 입력하세요');
  }
  if (!cusName) {
    return alert('고객명을 입력하세요');
  }
  try {
    await axios.post('/transactions', { transNum, productID, price, date, cusName });
  } catch (err) {
    console.error(err);
  }
  e.target.transNum.value = '';
  e.target.productID.value = '';
  e.target.price.value = '';
  e.target.date.value = '';
  e.target.cusName.value = '';
});
// 상품 등록
document.getElementById('product-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const productID = e.target.productID.value;
  const supName = e.target.supName.value;
  if (!name) {
    return alert('상품명을 입력하세요');
  }
  if (!productID) {
    return alert('상품ID를 입력하세요');
  }
  if (!price) {
    return alert('가격을 입력하세요');
  } if (!supName) {
    return alert('공급자명을 입력하세요');
  }
  try {
    await axios.post('/products', { name, productID, supName });
  } catch (err) {
    console.error(err);
  }
  e.target.name.value = '';
  e.target.productID.value = '';
  e.target.price.value = '';
  e.target.supName.value = '';
});

