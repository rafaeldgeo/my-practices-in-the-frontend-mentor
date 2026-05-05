# **CODEX\_CONTRACT.md**

## **Skills Learning Tracker — Contrato de Implementação com IA**

---

## **1\. Contexto do Projeto**

Este projeto é uma implementação **frontend-only** de um sistema de rastreamento de aprendizado (Skills Learning Tracker).

Stack obrigatória:

* HTML5 semântico  
* CSS3 \+ SASS (SCSS)  
* JavaScript Vanilla (ES Modules)  
* Arquitetura MVC adaptada (Model / Services / Controller / View)

O projeto será executado em ambiente **estático (GitHub Pages)**.

---

# **Estrutura Final do Projeto — Skills Learning Tracker**

skills-learning-tracker/  
│  
├── public/  
│   ├── index.html  
│   │  
│   ├── favicon/  
│   │   └── favicon.ico  
│   │  
│   ├── assets/  
│   │   ├── css/  
│   │   │   └── main.css          ← CSS compilado (output do SASS)  
│   │   │  
│   │   ├── images/  
│   │   ├── icons/  
│   │   └── fonts/  
│  
├── src/  
│   ├── app.js                    ← ponto de entrada (ES Modules)  
│   │  
│   ├── model/  
│   │   ├── skill.model.js  
│   │   └── session.model.js  
│   │  
│   ├── services/  
│   │   ├── streak.service.js  
│   │   ├── heatmap.service.js  
│   │   ├── pacing.service.js  
│   │   └── stats.service.js  
│   │  
│   ├── controller/  
│   │   ├── dashboard.controller.js  
│   │   └── session.controller.js  
│   │  
│   ├── store/  
│   │   └── data.store.js  
│   │  
│   ├── view/  
│   │   ├── dashboard/  
│   │   │   ├── dashboard.view.js  
│   │   │   └── dashboard.template.js  
│   │   │  
│   │   └── components/  
│   │       ├── hero.component.js  
│   │       ├── stats.component.js  
│   │       ├── heatmap.component.js  
│   │       └── recent-sessions.component.js  
│   │  
│   ├── styles/                   ← SASS (source)  
│   │   ├── base/  
│   │   │   ├── \_reset.scss  
│   │   │   ├── \_variables.scss  
│   │   │   ├── \_typography.scss  
│   │   │   └── \_globals.scss  
│   │   │  
│   │   ├── layout/  
│   │   │   ├── \_grid.scss  
│   │   │   └── \_container.scss  
│   │   │  
│   │   ├── components/  
│   │   │   ├── \_hero.scss  
│   │   │   ├── \_stats.scss  
│   │   │   ├── \_heatmap.scss  
│   │   │   └── \_recent.scss  
│   │   │  
│   │   └── main.scss            ← entrada do SASS  
│  
├── data/  
│   └── sample-skills.json  
│  
├── CODEX\_CONTRACT.md  
├── README.md  
├── progresso\_projeto.md  
└── package.json

---

## **3\. Arquitetura (MVC Adaptado)**

### **Model**

* Representa dados (Skill, Session)  
* Pode conter validações simples  
* NÃO contém lógica de negócio complexa

---

### **Services**

* Contém regras de negócio  
* Exemplos:  
  * cálculo de streak  
  * geração de heatmap  
  * cálculo de pacing  
* NÃO acessa DOM  
* NÃO manipula estado global

---

### **Controller**

* Orquestra fluxo da aplicação  
* Consome Model \+ Services  
* Monta o **ViewModel (dashboardData)**  
* NÃO contém lógica de negócio pesada

---

### **View**

* Responsável apenas por renderização  
* NÃO contém lógica de negócio  
* NÃO acessa Services diretamente

---

### **Store**

* Camada de acesso a dados  
* Responsável por:  
  * leitura de JSON  
  * persistência futura (ex: localStorage)

---

## **4\. Paradigma de Programação (Obrigatório)**

Este projeto utiliza um **paradigma funcional híbrido**.

---

### **Princípios**

* Priorizar **funções puras**  
* Evitar mutação direta de dados  
* Evitar efeitos colaterais fora do Controller  
* Trabalhar com dados imutáveis (ou tratados como imutáveis)

---

### **Services (CRÍTICO)**

* Devem ser funções puras  
* Recebem dados → retornam novos dados  
* NÃO devem:  
  * alterar dados de origem  
  * acessar DOM  
  * acessar storage

---

### **Controller**

* Pode lidar com efeitos colaterais:  
  * leitura/escrita de dados  
  * atualização da view  
* Responsável por:  
  * orquestração  
  * composição do estado final

---

### **Model**

* Estrutura de dados  
* Validação leve apenas  
* NÃO contém lógica derivada complexa

---

### **View**

* Manipula DOM  
* NÃO contém lógica de negócio

---

### **Regra de Imutabilidade**

Sempre evitar:

array.push(...)  
obj.prop \= ...

Preferir:

const newArray \= \[...array, item\]

---

## **5\. Regras de Implementação**

### **JavaScript**

* Usar ES Modules (import/export)  
* Não usar frameworks  
* Não usar bibliotecas externas  
* Código deve ser modular e legível

---

### **Nomeação de Arquivos**

* `*.model.js`  
* `*.service.js`  
* `*.controller.js`  
* `*.view.js`

Nomes devem refletir responsabilidade.

---

### **Comentários (Obrigatório)**

Todo arquivo deve conter:

* descrição do propósito  
* explicação das funções principais

Funções complexas devem ser comentadas.

---

## **6\. Regras de Qualidade**

### **NÃO PERMITIDO**

* gambiarra  
* lógica duplicada  
* arquivos genéricos como:  
  * utils.js (sem escopo claro)  
  * helpers.js  
* misturar responsabilidades  
* acesso ao DOM fora da View  
* lógica de negócio fora dos Services

---

### **BOAS PRÁTICAS**

* funções pequenas e coesas  
* responsabilidade única  
* previsibilidade  
* ausência de efeitos colaterais inesperados

---

## **7\. Regras de Dados**

* Fonte inicial:  
  * `data/sample-skills.json`  
* Estrutura:  
  * skills  
  * sessions  
* O sistema é baseado em eventos (sessions)

---

## **8\. Deploy (GitHub Pages)**

### **Restrições**

* Projeto deve ser 100% estático  
* NÃO usar backend

---

### **Caminhos**

Sempre usar caminhos relativos:

./data/sample-skills.json

Nunca usar:

/src/data/sample-skills.json

---

## **9\. SASS / CSS**

* Estrutura baseada em:  
  * base  
  * layout  
  * components  
* Compilação de SASS é externa (fora do escopo do Codex)

---

## **10\. Fluxo de Dados**

Fluxo padrão:

Controller → Services → Controller → View

* Services retornam dados (não mutam estado)  
* Controller monta o `dashboardData`  
* View renderiza

---

## **11\. Estratégia de Atualização**

Após qualquer ação (ex: nova sessão):

Recalcular:

* streak  
* heatmap  
* pacing  
* stats

Atualizar completamente o `dashboardData`.

(Simplicidade \> otimização)

---

## **12\. Regras para IA (Codex)**

Ao gerar código:

* NÃO inventar arquitetura  
* NÃO criar arquivos fora da estrutura  
* NÃO adicionar dependências externas  
* NÃO criar abstrações desnecessárias  
* NÃO gerar código implícito ou “mágico”

Sempre:

* seguir este contrato  
* gerar código explícito  
* priorizar clareza

---

## **13\. Filosofia do Projeto**

Este projeto prioriza:

1. legibilidade  
2. separação de responsabilidades  
3. previsibilidade  
4. aprendizado

---

## **14\. Regra Final**

Em caso de dúvida:

* Priorizar clareza sobre “menos código”  
* Priorizar estrutura sobre atalhos  
* Priorizar previsibilidade sobre abstração

