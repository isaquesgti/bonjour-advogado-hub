# BONJOUR ADVOGADO HUB

Estrutura do Banco de Dados e Arquitetura do Sistema

Este projeto é um SaaS jurídico para monitoramento automático de processos e publicações em diários oficiais.

O sistema permite que advogados:

* monitorem processos
* recebam notificações automáticas
* recebam emails com movimentações
* acompanhem prazos e publicações

A arquitetura foi projetada para escalar e suportar milhares de processos monitorados.

---

ARQUITETURA GERAL DO SISTEMA

Fluxo principal:

1. Usuário cria conta
2. Advogado cadastra número de processo
3. Robô coleta publicações dos diários oficiais
4. Sistema detecta processos monitorados
5. Publicação é salva no banco
6. Notificação é gerada
7. Email é enviado ao advogado

---

ESTRUTURA DO BANCO DE DADOS

O banco utiliza PostgreSQL via Supabase.

---

TABELA: profiles

Armazena informações adicionais do usuário.

Campos:

id
uuid
identificador do registro

user_id
uuid
referência ao usuário autenticado

full_name
text
nome completo do advogado

oab_number
text
número da OAB

email
text
email do usuário

created_at
timestamp
data de criação

updated_at
timestamp
data de atualização

---

TABELA: monitored_processes

Processos monitorados pelos usuários.

Campos:

id
uuid
identificador

user_id
uuid
dono do monitoramento

process_number
text
número do processo

court
text
tribunal

description
text
descrição opcional

is_active
boolean
se o monitoramento está ativo

created_at
timestamp

updated_at
timestamp

---

TABELA: publications

Publicações coletadas automaticamente dos diários oficiais.

Campos:

id
uuid

process_number
text
número do processo detectado

court
text
tribunal

class
text
classe processual

parties
text
partes envolvidas

judge
text
juiz responsável

publication_date
date
data da publicação

full_text
text
texto completo da publicação

source
text
origem do diário oficial

created_at
timestamp

---

TABELA: notifications

Notificações geradas para os usuários.

Campos:

id
uuid

user_id
uuid

publication_id
uuid
referência à publicação encontrada

monitored_process_id
uuid
processo monitorado

title
text
título da notificação

message
text
mensagem

is_read
boolean
se o usuário leu

email_sent
boolean
se email já foi enviado

created_at
timestamp

---

TABELA: user_roles

Controle de permissões.

Campos:

id
uuid

user_id
uuid

role
text

Valores possíveis:

admin
user

---

TABELAS RECOMENDADAS PARA ESCALA

Estas tabelas são importantes para sistemas profissionais de monitoramento jurídico.

---

TABELA: courts

Lista de tribunais monitorados.

Campos:

id
uuid

name
text

code
text

state
text

country
text

---

TABELA: diary_sources

Lista de fontes de diários oficiais.

Campos:

id
uuid

court_id
uuid

name
text

url
text

scraping_type
text

Valores:

pdf
html
api

last_scraped_at
timestamp

---

TABELA: scraping_logs

Logs do robô de coleta.

Campos:

id
uuid

source_id
uuid

scraped_at
timestamp

status
text

records_found
integer

error_message
text

---

TABELA: email_logs

Controle de emails enviados.

Campos:

id
uuid

user_id
uuid

notification_id
uuid

email
text

sent_at
timestamp

status
text

---

RELACIONAMENTOS

auth.users
|
profiles
|
monitored_processes
|
notifications
|
publications

---

ROBÔ DE MONITORAMENTO JURÍDICO

O sistema possui um robô que executa periodicamente.

Fluxo do robô:

1 baixar diário oficial
2 extrair texto
3 localizar números de processos
4 salvar publicações
5 cruzar com processos monitorados
6 gerar notificações
7 enviar email

---

DIÁRIOS QUE PODEM SER MONITORADOS

TJSP
TRF
TRT
STJ
STF
TST
Diários estaduais

---

ARQUITETURA DO SISTEMA

Frontend
React + Vite

Backend
Supabase

Banco de dados
PostgreSQL

Deploy
Vercel

---

FUTURAS FUNCIONALIDADES

* detecção automática de prazos
* análise com IA de movimentações
* dashboard de prazos processuais
* integração com tribunais
* API pública

---

OBJETIVO DO PROJETO

Criar um sistema de monitoramento jurídico automatizado similar a plataformas como Bonnjur, porém com arquitetura moderna e escalável.
