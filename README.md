# Expense Tracker

Aplicación web para registrar y analizar gastos personales. Cada persona inicia sesión y solo ve sus propios gastos: esa regla la aplica la base de datos con Row Level Security, no solo el frontend.

**Demo:** https://expense-trackeri.netlify.app/

## Qué hace

- Registro e inicio de sesión reales con Supabase Auth, con confirmación por correo.
- Rutas protegidas: sin sesión no se puede entrar a la página de gastos.
- Crear, listar y eliminar gastos (monto, categoría, fecha y nota).
- Filtros combinables por categoría y rango de fechas.
- Total de los gastos que cumplen los filtros.
- Dos gráficas: gasto por categoría (barras) y gasto por mes (líneas).

## Tecnologías

React (Vite) · React Router · Supabase (Auth y PostgreSQL) · Recharts · Tailwind CSS

## Decisiones técnicas

- **Seguridad en la base de datos.** La tabla `expenses` tiene Row Level Security con políticas `auth.uid() = user_id` para leer, crear, editar y borrar. El frontend no filtra por usuario: aunque alguien modifique las peticiones, la base de datos no le devuelve gastos ajenos.
- **Estado derivado.** `filteredExpenses`, los totales y los datos de las gráficas se calculan en cada render a partir de `expenses` y los filtros. No se guardan como estado, así que no pueden desincronizarse.
- **Contextos separados.** `AuthContext` maneja la sesión y `ExpenseContext` maneja los datos y las operaciones sobre Supabase.
- **Sesión sincronizada.** `onAuthStateChange` mantiene el usuario actualizado y se cancela la suscripción al desmontar el componente.

## Cómo correrlo en local

1. Clona el repositorio e instala dependencias:
   ```bash
   git clone https://github.com/izangabriel/Expenses
   cd expense-tracker
   npm install
   ```
2. Crea un proyecto en [Supabase](https://supabase.com) y ejecuta el contenido de `supabase/schema.sql` en el SQL Editor.
3. Copia `.env.example` a `.env` y completa los valores (Project Settings, API). La URL debe ser la base del proyecto, sin rutas al final:
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_anon_key
   ```
4. Inicia la app:
   ```bash
   npm run dev
   ```

## Limitaciones conocidas

- El backend corre en el plan gratuito de Supabase, que pausa los proyectos con poca actividad. Si el demo no carga, avísame y lo reactivo.
- La edición de gastos existe en la lógica (`updateExpense`) pero todavía no tiene interfaz.
- No tiene pruebas automatizadas.
