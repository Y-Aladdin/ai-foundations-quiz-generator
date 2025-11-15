
import { Course } from './types';

export const COURSES: Course[] = [
  {
    id: 1,
    title: 'Build Your Own Small Language Model',
    description: 'Learn LM basics, n-grams, and responsible AI problem formulation.',
    content: `
      Course 1: Build Your Own Small Language Model
      - Overview: Introduces language models as systems predicting next words via probabilities; covers n-grams vs. transformers; ethical considerations for African contexts. Equation: P(B | A) = Count(A B) / Count(A) (conditional probability for n-grams).
      - Key Topics: N-grams (uni/bi/tri); probability estimation from data; randomness in sampling; ethical reflection on societal impacts.
      - Labs: Manual probability assignment; n-gram implementation in Python; text generation. Equation: chosen_word = random.choices(candidates, weights=probs).
      - Responsible Innovation: Values alignment; problem statements for community issues.
    `
  },
  {
    id: 2,
    title: 'Represent Your Language Data',
    description: 'Covers tokenization, embeddings, and ethical data sourcing for African languages.',
    content: `
      Course 2: Represent Your Language Data
      - Overview: Covers text preprocessing, tokenization (character/word/subword), embeddings; ethical data sourcing for African languages. Equation: Cosine similarity: cos(θ) = (A · B) / (|A| |B|) (for embedding similarity).
      - Key Topics: Preprocessing (HTML stripping, emojis); BPE algorithm; embeddings as vectors; tokenizer tax in low-resource languages. Equations: Vector length: |v| = √(∑ v_i²); Dot product: A · B = ∑ A_i * B_i.
      - Labs: Preprocess data; character/word/subword tokenization; train BPE; visualize embeddings.
      - Responsible Innovation: Data ownership, exclusion in African datasets; participatory data creation.
    `
  },
  {
    id: 3,
    title: 'Design and Train Neural Networks',
    description: 'Focuses on neural network training, backpropagation, and mitigating overfitting.',
    content: `
      Course 3: Design and Train Neural Networks
      - Overview: Focuses on neural network training; overfitting/underfitting; backpropagation; ethical anticipation in African applications. Equations: Gradient: ∇L = ∂L/∂w (loss w.r.t. weights); Update: w = w - η * ∇L (gradient descent).
      - Key Topics: Bias-variance trade-off; train-test splits; MLPs (neurons, layers); optimizers like SGD/Adam; loss curves. Equations: Binary cross-entropy: L = -[y log(p) + (1-y) log(1-p)]; Chain rule: ∂L/∂w = (∂L/∂z) * (∂z/∂w).
      - Labs: Signal vs. noise distinction; train MLPs in Keras; overfit mitigation; backpropagation implementation. Equations: Sigmoid: σ(z) = 1 / (1 + e^{-z}); ReLU: max(0, z).
      - Responsible Innovation: Anticipation of impacts; participatory AI in research.
    `
  },
  {
    id: 4,
    title: 'Discover the Transformer Architecture',
    description: 'Breaks down transformer components, attention mechanisms, and positional embeddings.',
    content: `
      Course 4: Discover the Transformer Architecture
      - Overview: Breaks down transformer components; attention mechanisms; positional embeddings; responsible innovation in interactions. Equation: Attention(Q, K, V) = softmax(QK^T / √d_k) V.
      - Key Topics: Self-attention; multi-head attention; masking; positional embeddings (sinusoidal/RoPE); MLP in blocks; decoding strategies. Equations: Positional encoding: PE(pos, 2i) = sin(pos / 10000^{2i/d}); RoPE: q' = R(θ) q (rotation matrix).
      - Labs: Visualize attention; implement attention equation; masked multi-head attention; trainable parameters in transformers. Equation: Multi-head: Concat(head_1, ..., head_h) W^O.
      - Responsible Innovation: Community values in automation; stakeholder mapping.
    `
  },
  {
    id: 5,
    title: 'Finetune Your Model',
    description: 'Learn to adapt pre-trained models using techniques like LoRA and QLoRA.',
    content: `
      Course 5: Finetune Your Model
      - Overview: Adapts pre-trained models for tasks; transfer learning; localization for African data. Equation: LoRA update: ΔW = BA (low-rank adaptation).
      - Key Topics: Full vs. parameter-efficient fine-tuning (LoRA/QLoRA); data augmentation; hyperparameter tuning.
      - Labs: Fine-tune transformer; compare methods; bias evaluation.
      - Responsible Innovation: Avoid catastrophic forgetting; community-aligned tuning.
    `
  },
  {
    id: 6,
    title: 'Align Your Model',
    description: 'Ensures safe and ethical outputs through methods like RLHF and DPO.',
    content: `
      Course 6: Align Your Model
      - Overview: Ensures safe/ethical outputs; cultural alignment (e.g., Ubuntu). Equation: RLHF reward: r(θ) = E[log π_θ(a|s) - β log π_ref(a|s) + γ] (PPO objective).
      - Key Topics: RLHF pipeline; DPO; reward models; red-teaming. Equation: DPO loss: L = -E[log σ(β log (π_θ(y_w|x) / π_ref(y_w|x)) - β log (π_θ(y_l|x) / π_ref(y_l|x)))].
      - Labs: Train reward model; apply RLHF; red-team biases.
      - Responsible Innovation: Participatory alignment; power imbalances.
    `
  },
  {
    id: 7,
    title: 'Accelerate Your Model',
    description: 'Optimizes models for deployment using pruning, distillation, and quantization.',
    content: `
      Course 7: Accelerate Your Model
      - Overview: Optimizes for deployment; edge devices in Africa. Equation: Quantization: w_q = round(w / s + z) (scale s, zero-point z).
      - Key Topics: Pruning/distillation; quantization; efficient architectures. Equation: Distillation loss: L = α L_task + (1-α) L_KL (KL divergence).
      - Labs: Quantize/prune; distill models; benchmark.
      - Responsible Innovation: Reduce footprint; accessibility.
    `
  },
  {
    id: 8,
    title: 'Capstone: Real-World Impact',
    description: 'Integrates all course knowledge into an end-to-end real-world project.',
    content: `
      Course 8: Capstone: Develop Your Model for Real-World Impact
      - Overview: Integrates all courses; real-world projects. Focuses on applying learned concepts.
      - Key Topics: Scoping; end-to-end pipeline; deployment; evaluation. Combines all prior equations and concepts.
      - Labs/Projects: Build/deploy SLM; milestones; final demo.
      - Responsible Innovation: Community engagement; ethical reviews.
    `
  },
];
