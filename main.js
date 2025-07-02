// Tạo lưới 7x6 = 42 ô nhập
function createInputGrid() {
  const grid = document.getElementById("inputGrid");
  grid.innerHTML = "";

  for (let i = 0; i < 42; i++) {
    const input = document.createElement("input");
    input.type = "number";
    input.className = "grid-input";
    input.min = "1";
    input.max = "45";
    input.addEventListener("input", validateInput);
    grid.appendChild(input);
  }
}

// Kiểm tra input hợp lệ
function validateInput(event) {
  const value = parseInt(event.target.value);
  if (value < 1 || value > 45) {
    event.target.value = "";
  }
}

// Lấy tất cả số đã nhập
function getInputNumbers() {
  const inputs = document.querySelectorAll(".grid-input");
  const numbers = [];

  inputs.forEach((input) => {
    const value = parseInt(input.value);
    if (!isNaN(value) && value >= 1 && value <= 99) {
      numbers.push(value);
    }
  });

  return numbers;
}

// Tìm các số chưa xuất hiện (từ 1-45)
function findMissingNumbers(inputNumbers) {
  const allNumbers = Array.from({ length: 45 }, (_, i) => i + 1);
  return allNumbers.filter((num) => !inputNumbers.includes(num));
}

// Trộn mảng ngẫu nhiên
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Tạo các hàng số ngẫu nhiên
function generateNumbers() {
  // Xóa thông báo lỗi cũ
  const oldMessages = document.querySelectorAll(
    ".error-message, .info-message",
  );
  oldMessages.forEach((msg) => msg.remove());

  const inputNumbers = getInputNumbers();

  if (inputNumbers.length === 0) {
    showMessage("Vui lòng nhập ít nhất một số!", "error");
    return;
  }

  const missingNumbers = findMissingNumbers(inputNumbers);

  if (missingNumbers.length === 0) {
    showMessage("Bạn đã nhập đủ tất cả các số từ 1-99!", "info");
    return;
  }

  // Trộn các số chưa xuất hiện
  const shuffledNumbers = shuffleArray(missingNumbers);

  // Chia thành các hàng 6 số
  const rows = [];
  for (let i = 0; i < shuffledNumbers.length; i += 6) {
    const row = shuffledNumbers.slice(i, i + 6);
    if (row.length === 6) {
      rows.push(row);
    }
  }

  displayResults(rows, shuffledNumbers.length);
}

// Hiển thị kết quả
function displayResults(rows, totalNumbers) {
  const resultsSection = document.getElementById("resultsSection");
  const resultsContainer = document.getElementById("resultsContainer");

  resultsContainer.innerHTML = "";

  if (rows.length === 0) {
    showMessage("Không đủ số để tạo thành hàng 6 số!", "info");
    resultsSection.style.display = "none";
    return;
  }

  rows.forEach((row, index) => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "result-row";

    row.forEach((number, numIndex) => {
      const numberDiv = document.createElement("div");
      numberDiv.className = "result-number";
      numberDiv.textContent = number;
      numberDiv.style.animationDelay = `${(index * 6 + numIndex) * 0.1}s`;
      rowDiv.appendChild(numberDiv);
    });

    resultsContainer.appendChild(rowDiv);
  });

  // Thêm thông tin tổng kết
  const summaryDiv = document.createElement("div");
  summaryDiv.className = "info-message";
  summaryDiv.innerHTML = `
            <strong>TỔNG KẾT</strong><br>
            Tổng số chưa xuất hiện: ${totalNumbers}<br>
            Số dãy số được tạo: ${rows.length}
        `;
  resultsContainer.appendChild(summaryDiv);

  resultsSection.style.display = "block";
}

// Hiển thị thông báo
function showMessage(text, type) {
  const messageDiv = document.createElement("div");
  messageDiv.className = type === "error" ? "error-message" : "info-message";
  messageDiv.textContent = text;

  const controls = document.querySelector(".controls");
  controls.parentNode.insertBefore(messageDiv, controls.nextSibling);

  // Tự động xóa thông báo sau 5 giây
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}

// Xóa tất cả
function clearAll() {
  const inputs = document.querySelectorAll(".grid-input");
  inputs.forEach((input) => (input.value = ""));

  const resultsSection = document.getElementById("resultsSection");
  resultsSection.style.display = "none";

  const messages = document.querySelectorAll(".error-message, .info-message");
  messages.forEach((msg) => msg.remove());
}

// Điền dữ liệu mẫu để test
function fillSample() {
  const inputs = document.querySelectorAll(".grid-input");

  for (let i = 0; i < inputs.length; i++) {
    const randomNum = Math.floor(Math.random() * 45) + 1; // Số từ 1 đến 45
    inputs[i].value = randomNum;
  }
}

// Khởi tạo khi trang load
document.addEventListener("DOMContentLoaded", function () {
  createInputGrid();
});
