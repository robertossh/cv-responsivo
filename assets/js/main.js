/*==================== MOSTRAR MENU ====================*/
const mostrarMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validar se as variáveis existem
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            // Adicionamos a classe show-menu à tag div com a classe nav__menu
            nav.classList.toggle('show-menu')
        })
    }
}
mostrarMenu('nav-toggle', 'nav-menu')

/*==================== REMOVER MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function acaoLink() {
    const navMenu = document.getElementById('nav-menu')
    // Quando clicamos em cada nav__link, removemos a classe show-menu
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', acaoLink))

/*==================== LINK ATIVO DE SEÇÃO AO ROLAR ====================*/
const secoes = document.querySelectorAll('section[id]')

function rolarAtivo() {
    const scrollY = window.pageYOffset

    secoes.forEach(atual => {
        const alturaSecao = atual.offsetHeight
        const topoSecao = atual.offsetTop - 50;
        const idSecao = atual.getAttribute('id')

        if (scrollY > topoSecao && scrollY <= topoSecao + alturaSecao) {
            document.querySelector('.nav__menu a[href*=' + idSecao + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + idSecao + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', rolarAtivo)

/*==================== MOSTRAR VOLTAR AO TOPO ====================*/
function rolarTopo() {
    const scrollTop = document.getElementById('scroll-top');
    // Quando o scroll for maior que 200px de altura da viewport, adicionamos a classe show-scroll ao link de scroll-top
    if (this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', rolarTopo)

/*==================== TEMA ESCURO CLARO ====================*/
const botaoTema = document.getElementById('theme-button')
const temaEscuro = 'dark-theme'
const iconeTema = 'bx-sun'

// Tópico selecionado anteriormente (caso o usuário tenha escolhido)
const temaSelecionado = localStorage.getItem('selected-theme')
const iconeSelecionado = localStorage.getItem('selected-icon')

// Obtém o tema atual que a interface está usando, verificando a classe dark-theme
const obterTemaAtual = () => document.body.classList.contains(temaEscuro) ? 'dark' : 'light'
const obterIconeAtual = () => botaoTema.classList.contains(iconeTema) ? 'bx-moon' : 'bx-sun'

// Verificamos se o usuário escolheu um tema anteriormente
if (temaSelecionado) {
    // Se a validação for verdadeira, verificamos o que foi escolhido para saber se ativamos ou desativamos o tema escuro
    document.body.classList[temaSelecionado === 'dark' ? 'add' : 'remove'](temaEscuro)
    botaoTema.classList[iconeSelecionado === 'bx-moon' ? 'add' : 'remove'](iconeTema)
}

// Ativar / desativar o tema manualmente com o botão
botaoTema.addEventListener('click', () => {
    // Adiciona ou remove o tema escuro / ícone de tema
    document.body.classList.toggle(temaEscuro)
    botaoTema.classList.toggle(iconeTema)
    // Salvamos o tema e o ícone atual que o usuário escolheu
    localStorage.setItem('selected-theme', obterTemaAtual())
    localStorage.setItem('selected-icon', obterIconeAtual())
})

/*==================== REDUZIR O TAMANHO E IMPRIMIR EM UMA FOLHA A4 ====================*/
function reduzirCv() {
    document.body.classList.add('scale-cv')
}

/*==================== REMOVER O TAMANHO QUANDO O CV FOR BAIXADO ====================*/
function removerReduzir() {
    document.body.classList.remove('scale-cv')
}

/*==================== GERAR PDF ====================*/
// Área gerada para o PDF
let areaCv = document.getElementById('area-cv')

let botaoResume = document.getElementById('resume-button')

// Opções do Html2pdf
let opt = {
    margin: 0,
    filename: 'Resume_CV.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 4 },
    jsPDF: { format: 'a4', orientation: 'portrait' }
}

// Função para chamar a áreaCv e as opções do Html2Pdf
function gerarCurriculo() {
    html2pdf(areaCv, opt)
}

// Quando o botão é clicado, ele executa as três funções
botaoResume.addEventListener('click', () => {

    // 1. A classe .scale-cv é adicionada ao corpo, onde reduz o tamanho dos elementos
    reduzirCv()

    // 2. O PDF é gerado
    gerarCurriculo()

    // 3. A classe .scale-cv é removida do corpo após 5 segundos para voltar ao tamanho normal
    setTimeout(removerReduzir, 5000)
})
