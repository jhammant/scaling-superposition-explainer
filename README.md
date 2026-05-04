# Scaling Superposition Explainer

An interactive, single-page explainer for **“Superposition Yields Robust Neural Scaling”** by Yizhou Liu, Ziming Liu, and Jeff Gore.

Live site: https://jhammant.github.io/scaling-superposition-explainer/

The page now includes:
- a geometric intuition walkthrough for strong vs. weak superposition
- an interactive width/crowding simulator
- a closer reading-guide section pulled from the original paper: definitions, the weight-decay dial, synthetic distributions, real LLM evidence, Chinchilla connection, and limits
- direct source links to the paper and code

Sources:
- Paper: https://arxiv.org/abs/2505.10465 (v4, NeurIPS 2025 Best Paper Runner-up)
- Authors' code: https://github.com/liuyz0/SuperpositionScaling

This is an explanatory abstraction: it visualizes the paper’s core intuition that strong superposition creates predictable representation interference, with the model-width-dependent component of loss scaling approximately like `1 / m`.

## What is included

- A visual overview of weak vs strong superposition
- A deeper paper-derived walkthrough of the toy model, tail-dropping loss, overlap-limited loss, and Welch-bound intuition
- LLM evidence from OPT, GPT-2, Qwen2.5, and Pythia output-head overlaps
- Caveats from the paper: vocabulary-width ceilings, very skewed feature distributions, and the distinction between representation loss and parsing loss
- A small interactive simulator for feature crowding, width, and interference

## Deploy

This repo is public and served with GitHub Pages from `main` at `/`:

https://jhammant.github.io/scaling-superposition-explainer/

