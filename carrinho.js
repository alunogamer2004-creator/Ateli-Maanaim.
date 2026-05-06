// Gerenciamento do Carrinho

let carrinho = [];

function carregarCarrinho() {
    const salvo = localStorage.getItem('carrinho_atelie');
    if (salvo) {
        carrinho = JSON.parse(salvo);
    }
    atualizarCarrinhoDisplay();
}

function salvarCarrinho() {
    localStorage.setItem('carrinho_atelie', JSON.stringify(carrinho));
    atualizarCarrinhoDisplay();
}

function adicionarAoCarrinho(id, nome, preco, imagem) {
    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            id: id,
            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1
        });
    }
    salvarCarrinho();
    abrirCarrinho();
}

function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    salvarCarrinho();
}

function atualizarQuantidade(id, novaQuantidade) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        if (novaQuantidade <= 0) {
            removerDoCarrinho(id);
        } else {
            item.quantidade = novaQuantidade;
            salvarCarrinho();
        }
    }
}

function calcularTotal() {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

function atualizarCarrinhoDisplay() {
    const itensContainer = document.getElementById('carrinho-itens');
    const totalElement = document.getElementById('carrinho-total');
    const contadorElement = document.getElementById('contador-carrinho');
    
    if (itensContainer) {
        if (carrinho.length === 0) {
            itensContainer.innerHTML = '<p>Carrinho vazio</p>';
        } else {
            itensContainer.innerHTML = carrinho.map(item => `
                <div class="carrinho-item">
                    <div>
                        <strong>${item.nome}</strong><br>
                        R$ ${item.preco.toFixed(2)}
                        <input type="number" value="${item.quantidade}" min="1" 
                               onchange="atualizarQuantidade('${item.id}', parseInt(this.value))"
                               style="width: 60px; margin-top: 5px;">
                    </div>
                    <button class="remover-item" onclick="removerDoCarrinho('${item.id}')">Remover</button>
                </div>
            `).join('');
        }
    }
    
    if (totalElement) {
        totalElement.textContent = `Total: R$ ${calcularTotal().toFixed(2)}`;
    }
    
    if (contadorElement) {
        const totalItens = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
        contadorElement.textContent = totalItens;
    }
}

function abrirCarrinho() {
    const sidebar = document.getElementById('carrinho-sidebar');
    if (sidebar) {
        sidebar.classList.add('aberto');
    }
}

function fecharCarrinho() {
    const sidebar = document.getElementById('carrinho-sidebar');
    if (sidebar) {
        sidebar.classList.remove('aberto');
    }
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    let mensagem = 'Olá! Gostaria de fazer o pedido:\n\n';
    carrinho.forEach(item => {
        mensagem += `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });
    mensagem += `\nTotal: R$ ${calcularTotal().toFixed(2)}`;
    
    window.open(`https://wa.me/5511958095858?text=${encodeURIComponent(mensagem)}`, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
    carregarCarrinho();
});
