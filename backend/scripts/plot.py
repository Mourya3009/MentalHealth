import matplotlib.pyplot as plt
import numpy as np
import sys
import os

def create_plots(scores_string):
    """Create line plot and bar plot for mental health scores"""
    
    # Parse scores from string
    scores = [float(x.strip()) for x in scores_string.split(',') if x.strip()]
    
    if not scores:
        print("No scores provided")
        return
    
    # Create figure with subplots
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(12, 10))
    
    # Line Plot - Mental Health Trends
    x_values = range(1, len(scores) + 1)
    ax1.plot(x_values, scores, marker='o', linewidth=2, markersize=6, color='#a78bfa')
    ax1.set_title('Mental Health Trends Over Time', fontsize=16, fontweight='bold', color='#333')
    ax1.set_xlabel('Assessment Number', fontsize=12)
    ax1.set_ylabel('Mental Health Score', fontsize=12)
    ax1.grid(True, alpha=0.3)
    ax1.set_ylim(0, 5)
    ax1.set_xticks(x_values)
    
    # Add trend line
    if len(scores) > 1:
        z = np.polyfit(x_values, scores, 1)
        p = np.poly1d(z)
        ax1.plot(x_values, p(x_values), "--", alpha=0.8, color='#f472b6', linewidth=2)
    
    # Bar Plot - Score Distribution
    score_ranges = ['0-1', '1-2', '2-3', '3-4', '4-5']
    score_counts = [0, 0, 0, 0, 0]
    
    for score in scores:
        if 0 <= score < 1:
            score_counts[0] += 1
        elif 1 <= score < 2:
            score_counts[1] += 1
        elif 2 <= score < 3:
            score_counts[2] += 1
        elif 3 <= score < 4:
            score_counts[3] += 1
        elif 4 <= score <= 5:
            score_counts[4] += 1
    
    colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981']
    bars = ax2.bar(score_ranges, score_counts, color=colors, alpha=0.8)
    ax2.set_title('Mental Health Score Distribution', fontsize=16, fontweight='bold', color='#333')
    ax2.set_xlabel('Score Range', fontsize=12)
    ax2.set_ylabel('Number of Assessments', fontsize=12)
    ax2.grid(True, alpha=0.3, axis='y')
    
    # Add value labels on bars
    for bar, count in zip(bars, score_counts):
        if count > 0:
            ax2.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.1, 
                    str(count), ha='center', va='bottom', fontweight='bold')
    
    # Adjust layout
    plt.tight_layout()
    
    # Save plots
    static_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'static')
    os.makedirs(static_dir, exist_ok=True)
    
    # Save line plot
    fig1, ax1_only = plt.subplots(figsize=(10, 6))
    ax1_only.plot(x_values, scores, marker='o', linewidth=2, markersize=6, color='#a78bfa')
    ax1_only.set_title('Mental Health Trends Over Time', fontsize=16, fontweight='bold', color='#333')
    ax1_only.set_xlabel('Assessment Number', fontsize=12)
    ax1_only.set_ylabel('Mental Health Score', fontsize=12)
    ax1_only.grid(True, alpha=0.3)
    ax1_only.set_ylim(0, 5)
    ax1_only.set_xticks(x_values)
    
    if len(scores) > 1:
        z = np.polyfit(x_values, scores, 1)
        p = np.poly1d(z)
        ax1_only.plot(x_values, p(x_values), "--", alpha=0.8, color='#f472b6', linewidth=2)
    
    fig1.savefig(os.path.join(static_dir, 'plot.png'), dpi=300, bbox_inches='tight')
    plt.close(fig1)
    
    # Save bar plot
    fig2, ax2_only = plt.subplots(figsize=(10, 6))
    bars = ax2_only.bar(score_ranges, score_counts, color=colors, alpha=0.8)
    ax2_only.set_title('Mental Health Score Distribution', fontsize=16, fontweight='bold', color='#333')
    ax2_only.set_xlabel('Score Range', fontsize=12)
    ax2_only.set_ylabel('Number of Assessments', fontsize=12)
    ax2_only.grid(True, alpha=0.3, axis='y')
    
    for bar, count in zip(bars, score_counts):
        if count > 0:
            ax2_only.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.1, 
                    str(count), ha='center', va='bottom', fontweight='bold')
    
    fig2.savefig(os.path.join(static_dir, 'barplot.png'), dpi=300, bbox_inches='tight')
    plt.close(fig2)
    
    plt.close('all')
    print("Plots generated successfully")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        scores_string = sys.argv[1]
        create_plots(scores_string)
    else:
        print("No scores provided")
