---
sidebar_position: 1
custom_doc_type: "guide"
tags: ["internal"]
draft: true
version: 0.1.0
last_updated: '2025-05-31'
---

```src/vv.Domain/Docs/Domains/Asset/black-litterman-model.md
# Black-Litterman Model

> Mathematical formulation of the Black-Litterman approach

---

## Mathematical Foundation

The Black-Litterman model uses Bayesian statistics to combine market equilibrium with investor views. This document provides the detailed mathematical formulation of the model and its derivation.

## Notation

| Symbol | Description |
|--------|-------------|
| E(R) | Vector of expected returns |
| Π | Vector of implied equilibrium returns |
| Σ | Covariance matrix of returns |
| w_mkt | Market capitalization weights |
| λ | Risk aversion coefficient |
| τ | Scalar representing uncertainty in equilibrium |
| P | View matrix |
| Q | View vector |
| Ω | Covariance matrix of view uncertainty |

## Market Equilibrium

### Reverse Optimization

The model starts with reverse optimization to derive the implied equilibrium returns from market weights:

$$\Pi = \lambda \Sigma w_{mkt}$$

Where:
- $\Pi$ is the vector of implied excess returns
- $\lambda$ is the risk aversion coefficient
- $\Sigma$ is the covariance matrix of returns
- $w_{mkt}$ is the vector of market capitalization weights

### Derivation

This formula comes from the first-order conditions of mean-variance utility maximization:

$$U(w) = w^T E(R) - \frac{\lambda}{2} w^T \Sigma w$$

Taking the derivative and setting to zero:

$$\frac{\partial U}{\partial w} = E(R) - \lambda \Sigma w = 0$$

Solving for expected returns:

$$E(R) = \lambda \Sigma w$$

Assuming the market portfolio represents equilibrium:

$$\Pi = \lambda \Sigma w_{mkt}$$

## Investor Views

### View Specification

Investor views are expressed as:

$$P \times E(R) = Q + \varepsilon$$

Where:
- $P$ is the $k \times n$ view matrix defining the assets involved in each view
- $E(R)$ is the $n \times 1$ expected return vector
- $Q$ is the $k \times 1$ vector of view values
- $\varepsilon$ represents the uncertainty in the views, $\varepsilon \sim N(0, \Omega)$

### Absolute vs. Relative Views

Views can be expressed in two ways:

1. **Absolute Views**: Direct statements about expected returns
   - Example: "Asset A will return 5%"
   - Row in P matrix: [1, 0, 0, ...] for asset A
   - Corresponding Q value: 0.05

2. **Relative Views**: Comparative statements between assets
   - Example: "Asset A will outperform Asset B by 2%"
   - Row in P matrix: [1, -1, 0, ...] for assets A and B
   - Corresponding Q value: 0.02

## Bayesian Framework

### Prior Distribution

The prior distribution represents the market equilibrium:

$$E(R) \sim N(\Pi, \tau\Sigma)$$

Where $\tau$ is a scalar that adjusts the uncertainty in the prior.

### View Distribution

The distribution of views is:

$$P \times E(R) \sim N(Q, \Omega)$$

Where $\Omega$ is the covariance matrix of view uncertainties.

### Posterior Distribution

Using Bayes' theorem, the posterior distribution is:

$$E(R) \sim N(\mu_{BL}, M)$$

Where:
- $M = [(\tau\Sigma)^{-1} + P^T\Omega^{-1}P]^{-1}$
- $\mu_{BL} = M \times [(\tau\Sigma)^{-1}\Pi + P^T\Omega^{-1}Q]$

This simplifies to:

$$\mu_{BL} = \Pi + \tau\Sigma P^T[\tau P \Sigma P^T + \Omega]^{-1}(Q - P\Pi)$$

## Parameter Calibration

### Risk Aversion Coefficient (λ)

The risk aversion coefficient can be calibrated as:

$$\lambda = \frac{E(R_m) - r_f}{\sigma_m^2}$$

Where:
- $E(R_m)$ is the expected market return
- $r_f$ is the risk-free rate
- $\sigma_m^2$ is the variance of market returns

### Uncertainty Scalar (τ)

Typical values for $\tau$ range from 0.01 to 0.05, with 0.025 being common. It can be calibrated more precisely using:

$$\tau = \frac{1}{T}$$

Where $T$ is the effective number of observations used to estimate $\Sigma$.

### View Uncertainty (Ω)

Several approaches exist for calibrating $\Omega$:

1. **Proportional to Prior Variance**:
   $$\Omega = \text{diag}(P(\tau\Sigma)P^T)$$

2. **Confidence-Based**:
   $$\Omega_{ii} = \frac{1}{c_i} (P\Sigma P^T)_{ii}$$
   
   Where $c_i$ is the confidence in view $i$, scaled from 0 to 1.

3. **Historical Method**:
   Estimate view uncertainty from historical tracking error.

## Optimal Portfolio Weights

The optimal portfolio weights using the Black-Litterman expected returns are:

$$w_{BL} = (\lambda\Sigma)^{-1}\mu_{BL}$$

## Practical Considerations

### Handling Multiple Views

When multiple views are specified:
1. Each view corresponds to a row in the P matrix
2. Views should be consistent (non-contradictory)
3. View uncertainties can differ based on confidence levels

### Numerical Stability

To ensure numerical stability:
1. Use matrix decomposition for inversions (e.g., Cholesky)
2. Scale returns to similar orders of magnitude
3. Check for conditioning issues in $\Sigma$
4. Regularize $\Sigma$ if necessary

### Special Cases

1. **No Views**: When P is empty, $\mu_{BL} = \Pi$ (equilibrium case)
2. **100% Confidence**: As $\Omega \to 0$, the model gives full weight to views
3. **Zero Confidence**: As $\Omega \to \infty$, the model reverts to equilibrium

## Extensions

### Factor-Based Black-Litterman

The model can be extended to factor space:

$$\Pi_F = \lambda \Sigma_F w_{F,mkt}$$
$$P_F \times E(F) = Q_F + \varepsilon_F$$

Where subscript F indicates factor-related quantities.

### Alternative Risk Measures

The model can be reformulated using alternative risk measures:

$$\Pi = \lambda \cdot \nabla Risk(w_{mkt})$$

Where $\nabla Risk(w)$ is the gradient of the risk measure.

## Implementation Example

```python
# Simplified implementation
import numpy as np
from scipy import linalg

def black_litterman(Sigma, w_mkt, P, Q, tau=0.025, lambda_=2.5, Omega=None):
    # Calculate implied returns
    Pi = lambda_ * Sigma @ w_mkt
    
    # Set default Omega if not provided
    if Omega is None:
        Omega = np.diag(np.diag(tau * P @ Sigma @ P.T))
    
    # Calculate posterior distribution parameters
    M = np.linalg.inv(np.linalg.inv(tau * Sigma) + P.T @ np.linalg.inv(Omega) @ P)
    mu_BL = M @ (np.linalg.inv(tau * Sigma) @ Pi + P.T @ np.linalg.inv(Omega) @ Q)
    
    # Calculate optimal weights
    w_BL = np.linalg.inv(lambda_ * Sigma) @ mu_BL
    
    return mu_BL, w_BL
```

For further details on specific aspects of the model, see:
* [Black-Litterman Overview](./black-litterman-overview.md)
* [Black-Litterman Views](./black-litterman-views.md)
* [Black-Litterman Implementation](./black-litterman-implementation.md)
* [Black-Litterman Validation](./black-litterman-validation.md)