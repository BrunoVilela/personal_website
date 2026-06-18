# Bruno Vilela Academic Website

Website acadêmico em Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Recharts, D3 e Leaflet.

## Executar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

Validações:

```bash
npm run typecheck
npm run build
```

## Publicar na Vercel

1. Envie o repositório para GitHub, GitLab ou Bitbucket.
2. Importe o projeto na Vercel.
3. Framework preset: `Next.js`.
4. Build command: `npm run build`.
5. Output: automático pelo Next.js.
6. Configure o domínio final e atualize `siteConfig.url` em `data/site.ts`.

## Conteúdo e dados

Os dados base originais continuam em `data/`, mas as áreas principais editáveis pelo painel usam arquivos JSON em `content/`.

- `site.ts`: identidade, navegação, métricas e links acadêmicos.
- `research.ts`: temas de pesquisa.
- `publications.ts`: publicações e exportação BibTeX.
- `software.ts`: softwares científicos.
- `lab.ts`: equipe, projetos e colaborações.
- `supervision.ts`: orientações em andamento e concluídas extraídas do Lattes.
- `teaching.ts`: disciplinas e materiais.
- `youtube.ts`: cursos e aulas no YouTube.
- `blog.ts`: posts de exemplo.
- `impact.ts`: dados dos dashboards.


## Editar conteúdo sem mexer no código

O site agora inclui um CMS gratuito baseado no Decap CMS. Ele permite editar textos e imagens pelo navegador, salvando as mudanças como arquivos em `content/`.

### Como acessar

1. Rode o site localmente com `npm run dev`.
2. Acesse `http://localhost:3000/admin` ou a porta indicada pelo terminal.
3. Em produção, acesse `https://SEU-DOMINIO/admin`.
4. Faça login com uma conta GitHub autorizada no repositório.

### O que pode ser editado

No painel `/admin`, as principais áreas editáveis são:

- Página inicial: título, subtítulo, imagem principal e bloco do LinkedIn.
- Sobre: foto, biografia, linha do tempo, prêmios, links de perfis e texto de colaborações.
- Pesquisa: estrutura preparada para textos e seções narrativas.
- Ensino: hero, disciplinas/áreas de ensino universitário, cursos online, links do YouTube, imagens e tags.
- Equipe e alunos: orientandos atuais, alumni, nível, status, projeto, programa, Lattes, ORCID, Scholar, tese/dissertação/TCC e foto.
- Software: descrição das ferramentas, linguagem, papel no projeto, links, exemplos e métricas.
- Contato: e-mail, endereço, texto da página, mapa e textos do formulário.
- Citações e indicadores: citações, fator H, índice i10 e métricas desde 2021.
- Pesquisa - publicações: texto da página de publicações e lista local/editável de publicações. Esta lista complementa a sincronização ORCID/CrossRef e permite adicionar publicações manualmente.

Os arquivos ficam em:

```text
content/home/index.json
content/about/index.json
content/research/index.json
content/teaching/index.json
content/team/index.json
content/software/index.json
content/contact/index.json
content/metrics/index.json
content/publications/index.json
```

### Como editar publicações

1. Acesse `/admin`.
2. Abra `Páginas principais` > `Pesquisa - publicações`.
3. Edite uma publicação existente ou adicione um novo item em `Publicações locais/editáveis`.
4. Preencha pelo menos título, ano, tipo, autores, revista, tema principal e resumo.
5. Use DOI sem o prefixo `https://doi.org/` quando possível, por exemplo `10.1111/mec.17510`.
6. Publique a alteração. A Vercel fará o deploy automaticamente.

A sincronização ORCID/CrossRef ainda roda na página pública. Quando um registro editado localmente tiver o mesmo DOI de um registro ORCID, o site mescla os metadados e usa a cópia local como fallback confiável para autores, ano, revista e temas.

### Configurar GitHub no Decap CMS

O arquivo `public/admin/config.yml` usa o backend GitHub. Antes de publicar, ajuste a linha:

```yaml
repo: BrunoVilela/personal_website
```

Substitua pelo repositório real no formato `usuario/repositorio`, por exemplo `BrunoVilela/meu-site`.

Para login em produção, crie um OAuth App no GitHub:

1. Acesse GitHub > Settings > Developer settings > OAuth Apps.
2. Crie um novo app com a URL do site.
3. Use esta callback URL: `https://bvilela.com/api/callback`.
4. Copie o `Client ID` e gere um `Client Secret`.
5. Na Vercel, em Project Settings > Environment Variables, adicione:

```text
GITHUB_CLIENT_ID=valor_do_client_id
GITHUB_CLIENT_SECRET=valor_do_client_secret
```

6. Faça redeploy do projeto depois de salvar as variáveis.
7. Adicione apenas usuários autorizados ao repositório.

### Proteção por senha do painel

A rota `/admin` possui proteção básica opcional por variáveis de ambiente. Na Vercel, configure:

```text
ADMIN_USERNAME=seu_usuario
ADMIN_PASSWORD=sua_senha_forte
```

Se essas variáveis não existirem, o painel abre normalmente, mas as alterações ainda dependem do login GitHub configurado no Decap CMS.

### Como publicar alterações de conteúdo

1. Entre em `/admin`.
2. Edite a página desejada.
3. Clique em salvar/publicar.
4. O Decap CMS cria um commit no GitHub.
5. A Vercel detecta o commit e republica o site automaticamente.

Para usuários sem programação, o fluxo esperado é: abrir `/admin`, editar campos, salvar e aguardar a Vercel atualizar o site.


## Configurar envio do formulário de contato

O formulário em `/contato` envia mensagens pela rota `/api/contact` para `bvilela.bv@gmail.com` por padrão. Em produção, configure estas variáveis na Vercel em Project Settings > Environment Variables:

```text
RESEND_API_KEY=sua_chave_da_resend
CONTACT_EMAIL_TO=bvilela.bv@gmail.com
CONTACT_EMAIL_FROM=Website contact <no-reply@bvilela.com>
```

`CONTACT_EMAIL_TO` e `CONTACT_EMAIL_FROM` são opcionais, mas recomenda-se verificar o domínio `bvilela.com` no Resend e usar um remetente do próprio domínio, como `no-reply@bvilela.com`. Depois de salvar as variáveis, faça um novo deploy na Vercel.

## Integração ORCID e CrossRef

A página `/publicacoes` usa `lib/orcid-publications.ts` para tentar sincronizar automaticamente com o ORCID público `0000-0003-4072-0558`, com revalidação diária e fallback para os dados locais. O arquivo `lib/integrations.ts` mantém funções auxiliares iniciais:

- `fetchOrcidWorks(orcidId)`: consulta works da API pública ORCID.
- `fetchCrossRefWorks(query)`: consulta works da API CrossRef.
- `googleScholarNote()`: registra a limitação de API pública oficial do Google Scholar.

Para produção, crie rotas em `app/api/` ou server actions para sincronizar dados, salve resultados em um banco como PostgreSQL/Supabase/Neon via Prisma e revalide páginas com ISR.

## Estrutura pronta para expansão

- Bilingue: `app/en` já existe como ponto de entrada em inglês.
- Espanhol: adicionar `app/es` e separar strings por locale.
- Admin: `app/admin` carrega o Decap CMS; `public/admin/config.yml` configura o backend GitHub e `middleware.ts` permite proteção básica opcional.
- RSS: `app/rss.xml/route.ts`.
- SEO: `app/sitemap.ts`, `app/robots.ts`, OpenGraph em `app/og/route.tsx`.
