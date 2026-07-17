# Configuração do Supabase — Copy Impressoras

Siga estes passos uma única vez para ativar o painel de admin e as páginas de produto.

## 1. Criar o projeto
1. Acesse https://supabase.com e crie uma conta (grátis).
2. **New Project** → dê um nome (ex.: `copy-impressoras`) e uma **senha de banco** (guarde só pra você).
3. Escolha a região **South America (São Paulo)** para ficar mais rápido.

## 2. Criar a tabela e as permissões
No menu **SQL Editor** → **New query**, cole e rode este SQL:

```sql
-- Tabela de produtos
create table if not exists public.produtos (
  id uuid primary key default gen_random_uuid(),
  categoria text not null,
  nome text not null,
  modelo text,
  descricao text,
  imagem_url text,
  ordem int default 0,
  created_at timestamptz default now()
);

-- Segurança (RLS): leitura pública, escrita só para quem está logado
alter table public.produtos enable row level security;

create policy "produtos leitura publica" on public.produtos
  for select using (true);
create policy "produtos insere autenticado" on public.produtos
  for insert to authenticated with check (true);
create policy "produtos atualiza autenticado" on public.produtos
  for update to authenticated using (true);
create policy "produtos exclui autenticado" on public.produtos
  for delete to authenticated using (true);
```

## 3. Criar o armazenamento das fotos
1. Menu **Storage** → **New bucket** → nome **`produtos`** → marque **Public bucket** → Create.
2. Volte no **SQL Editor** e rode:

```sql
create policy "fotos leitura publica" on storage.objects
  for select using (bucket_id = 'produtos');
create policy "fotos envia autenticado" on storage.objects
  for insert to authenticated with check (bucket_id = 'produtos');
create policy "fotos atualiza autenticado" on storage.objects
  for update to authenticated using (bucket_id = 'produtos');
create policy "fotos exclui autenticado" on storage.objects
  for delete to authenticated using (bucket_id = 'produtos');
```

## 4. Criar o usuário do admin (você)
1. Menu **Authentication** → **Users** → **Add user** → **Create new user**.
2. Coloque seu **e-mail** e uma **senha** → Create. (Esse será o login do `/admin`.)
3. Recomendado: **Authentication → Providers → Email** → **desative "Enable sign ups"** para que ninguém possa se cadastrar sozinho.

## 5. Pegar as chaves e ligar no site
1. Menu **Project Settings → API**. Copie:
   - **Project URL**
   - **anon public** (a chave `anon`, pode ser pública)
2. No projeto, edite o arquivo **`.env.local`**:

```
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
```

3. Reinicie o servidor (`npm run dev`) ou, na Vercel, adicione essas 2 variáveis em
   **Project → Settings → Environment Variables** e faça um novo deploy.

> ⚠️ Nunca coloque a **service_role key** aqui — só a **anon**. A segurança fica por conta das políticas (RLS) acima.

## Pronto!
- Acesse **`/admin`** → faça login → cadastre produtos (nome, categoria, descrição e foto).
- Os produtos aparecem automaticamente em **`/produtos/impressoras`**, `/produtos/filamentos`, etc.
