# Guia de Responsividade - Amparo App

## 📱 Status Atual

**A aplicação NÃO está totalmente responsiva.**

### Problemas Identificados:

1. ❌ **Tamanhos de fonte fixos** - Valores hardcoded que não se adaptam
2. ❌ **Espaçamentos fixos** - Padding/margin sem escala
3. ❌ **Uso limitado de Dimensions** - Apenas 1 tela usa
4. ❌ **Sem escalabilidade** - Não usa PixelRatio ou hooks de dimensão
5. ❌ **Componentes com tamanhos fixos** - TabBar, Cards, etc.

---

## 🛠️ Solução Implementada

Criado o arquivo `utils/responsive.ts` com funções utilitárias para responsividade.

### Funções Disponíveis:

#### **1. Escalamento Básico**
```typescript
import { scaleWidth, scaleHeight } from '@/utils/responsive';

// Escala baseado na largura
const width = scaleWidth(100); // 100px no design base

// Escala baseado na altura
const height = scaleHeight(50);
```

#### **2. Fonte Responsiva**
```typescript
import { scaleFontSize } from '@/utils/responsive';

const fontSize = scaleFontSize(16); // Escala moderadamente
```

#### **3. Escalamento Moderado**
```typescript
import { scaleModerate } from '@/utils/responsive';

// Factor 0.5 = 50% da diferença
const padding = scaleModerate(20, 0.5);
```

#### **4. Porcentagem**
```typescript
import { wp, hp } from '@/utils/responsive';

const width = wp(80); // 80% da largura da tela
const height = hp(50); // 50% da altura da tela
```

#### **5. Verificação de Dispositivo**
```typescript
import { isTablet, isSmallDevice, isLargeDevice } from '@/utils/responsive';

if (isTablet()) {
  // Código específico para tablet
}

if (isSmallDevice()) {
  // Ajustes para dispositivos pequenos
}
```

---

## 📝 Exemplo de Uso

### Antes (Não Responsivo):
```typescript
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
  },
});
```

### Depois (Responsivo):
```typescript
import { scaleWidth, scaleHeight, scaleFontSize, scaleModerate } from '@/utils/responsive';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaleWidth(30),
    paddingTop: scaleHeight(60),
  },
  title: {
    fontSize: scaleFontSize(32),
    marginBottom: scaleHeight(12),
  },
  button: {
    paddingVertical: scaleHeight(16),
    borderRadius: scaleModerate(12),
  },
});
```

### Ou usando porcentagens:
```typescript
import { wp, hp, scaleFontSize } from '@/utils/responsive';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(8), // 8% da largura
    paddingTop: hp(7.5), // 7.5% da altura
  },
  title: {
    fontSize: scaleFontSize(32),
    marginBottom: hp(1.5),
  },
});
```

---

## 🎯 Recomendações de Implementação

### 1. **Prioridade Alta** - Aplicar em:
- ✅ Telas de autenticação (Login, Signup, Auth)
- ✅ Onboarding
- ✅ Dashboard/Home
- ✅ Configuração inicial

### 2. **Prioridade Média** - Aplicar em:
- Settings
- Profile
- Forms (Register Elderly, Locations)

### 3. **Prioridade Baixa** - Aplicar em:
- Modais
- Componentes menores

---

## 📐 Dimensões Base

O design foi baseado no **iPhone 11 Pro**:
- **Largura:** 375px
- **Altura:** 812px

Todos os valores serão escalados proporcionalmente a partir dessas dimensões.

---

## 🔧 Como Aplicar em Uma Tela Existente

1. Importe as funções necessárias:
```typescript
import { 
  scaleWidth, 
  scaleHeight, 
  scaleFontSize, 
  wp, 
  hp 
} from '@/utils/responsive';
```

2. Substitua valores fixos por valores escalados:
```typescript
// ❌ Antes
paddingHorizontal: 30,
fontSize: 16,

// ✅ Depois
paddingHorizontal: scaleWidth(30),
fontSize: scaleFontSize(16),
```

3. Para componentes condicionais por tamanho:
```typescript
import { isTablet } from '@/utils/responsive';

const cardWidth = isTablet() ? wp(45) : wp(90);
```

---

## 📱 Testando Responsividade

### Tamanhos de Tela para Testar:
- **Pequeno:** iPhone SE (320x568)
- **Médio:** iPhone 11 Pro (375x812)
- **Grande:** iPhone 14 Pro Max (430x932)
- **Tablet:** iPad Pro 11" (834x1194)

### No Expo:
```bash
# Testar em diferentes dispositivos
expo start
# Pressione 'i' para iOS ou 'a' para Android
# Selecione diferentes dispositivos no simulador
```

---

## ⚠️ Notas Importantes

1. **Não escale tudo** - Ícones, bordas finas (1-2px) podem permanecer fixos
2. **Use moderação** - `scaleModerate()` é melhor para padding/margin que `scaleWidth()`
3. **Fonte legível** - Nunca deixe fontes menores que 12px
4. **Teste real** - Sempre teste em dispositivos reais, não apenas no simulador

---

## 🚀 Próximos Passos

1. Aplicar responsividade nas telas principais
2. Criar componentes reutilizáveis já responsivos
3. Adicionar suporte a orientação landscape (se necessário)
4. Documentar padrões de design responsivo da equipe
