const API_URL = "https://hyper-voucher-api.onrender.com/api/vouchers";
document.getElementById('voucherForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const code = document.getElementById('code').value;
  const duration = document.getElementById('duration').value;

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, duration })
  });

  if (res.ok) {
    loadVouchers();
    document.getElementById('voucherForm').reset();
  } else {
    alert('Failed to add voucher');
  }
});

async function loadVouchers() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const tbody = document.getElementById('voucherTableBody');
  tbody.innerHTML = '';

  data.forEach(v => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${v.code}</td>
      <td>${v.duration}</td>
      <td>${v.status}</td>
      <td>${new Date(v.createdAt).toLocaleString()}</td>
      <td><button onclick="deleteVoucher('${v._id}')">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
}

async function deleteVoucher(id) {
  if (confirm('Are you sure you want to delete this voucher?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadVouchers();
  }
}

loadVouchers();